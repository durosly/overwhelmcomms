"use client";

import { memo, useRef } from "react";
import Image from "next/image";
import { FiX, FiImage } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { handleClientError } from "@/lib/utils";
import toast from "react-hot-toast";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import Empty from "@/app/(public)/components/empty";

function ApartmentImages({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (image) => {
			toastId.current = toast.loading("Deleting property image...");
			return axios.delete(`/api/admin/apartments/${id}/images`, {
				data: { images: [image] },
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments", { apartmentId: id }],
			});
		},
		onSuccess: () => {
			toast.success("Property image deleted", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const queryResponse = data?.data?.apartment || {};
	const { images: dbImages } = queryResponse;

	if (isError) {
		return (
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Images</h2>
					<p>Error: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Images</h2>
					<div className="flex flex-wrap gap-5 my-5">
						{isPending
							? Array(7)
									.fill(3)
									.map((_, i) => (
										<div
											key={i}
											className="h-20 w-20 flex-shrink-0 relative rounded-box overflow-hidden"
										>
											<Skeleton height={"5rem"} />
										</div>
									))
							: null}
						{!!dbImages && dbImages.length > 0
							? dbImages.map((img, i) => (
									<div
										key={i}
										className=" h-20 w-20 flex-shrink-0 relative rounded-box overflow-hidden"
									>
										<button
											disabled={isPendingMutation}
											onClick={() => mutate(img)}
											className="absolute top-2 right-2 z-10 btn btn-xs btn-error btn-square"
										>
											<FiX />
										</button>
										<Image
											src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${img}`}
											fill
											alt="room title"
											className="object-cover"
											sizes="80px"
										/>
									</div>
							  ))
							: null}
						{!isPending && !!dbImages && !dbImages.length ? (
							<Empty message={"No image uploaded yet"} />
						) : null}
					</div>
					<div className="card-actions">
						<button
							className="btn btn-primary"
							onClick={() =>
								document
									.getElementById("upload-images")
									.showModal()
							}
						>
							Upload
						</button>
					</div>
				</div>
			</div>

			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<UploadFileModal id={id} />
		</>
	);
}

function UploadFileModal({ id }) {
	const [files, setFiles] = useState([]);
	const isRemoving = useRef(false);

	return (
		<dialog
			id="upload-images"
			className="modal"
		>
			<div className="modal-box">
				<h3 className="font-bold text-lg">Upload Images</h3>

				<div>
					<DropImageZone setFiles={setFiles} />
					<ul className="space-y-2">
						{files.map((file, i) => (
							<UploadFile
								key={`${file.path}-${i}`}
								file={file}
								id={id}
								position={i}
							/>
						))}
					</ul>
				</div>
				<p className="py-4">Press ESC key or click outside to close</p>
			</div>
			<form
				method="dialog"
				className="modal-backdrop"
			>
				<button>close</button>
			</form>
		</dialog>
	);
}

function DropImageZone({ setFiles }) {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		setFiles(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
	});
	return (
		<div
			{...getRootProps({
				className: `border-4 border-dashed ${
					isDragActive ? "border-primary/30" : ""
				} p-5 rounded-md text-center my-5`,
			})}
		>
			<input {...getInputProps()} />
			<FiImage
				className={`w-20 h-20 mx-auto ${
					isDragActive ? "stroke-primary/30" : "stroke-gray-300"
				} `}
			/>
			<p>Drag images here or click to upload</p>
		</div>
	);
}

function UploadFile({ file, id }) {
	const initialized = useRef(false);

	const [isUploading, setIsUploading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [saving, setSaving] = useState(false);
	const [loaded, setLoaded] = useState(0);
	const [progress, setProgress] = useState(0);
	const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CNAME}/image/upload`;
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;

			// My actual effect logic...

			uploadImage();
		}
	}, []);

	async function uploadImage() {
		if (isUploading) return;
		setIsUploading(true);

		try {
			const response = await axios.post(url, formData, {
				onUploadProgress: (progressEvent) => {
					setLoaded(progressEvent.loaded);
					setProgress(
						Math.min(
							Math.floor(
								(progressEvent.loaded / file.size) * 100
							),
							100
						)
					);
				},
			});

			if (!response?.data?.secure_url) throw Error("An error occured");

			saveToDb(response.data.public_id);
		} catch (error) {
			const message = handleClientError(error);
			setErrorMsg(message);
		} finally {
			setIsUploading(false);
		}
	}

	async function saveToDb(public_id) {
		if (saving) return;
		setSaving(true);
		try {
			const response = await axios.post(
				`/api/admin/apartments/${id}/images`,
				{ images: [public_id] }
			);
			if (!response?.data?.status) throw new Error("Saving to DB Error");

			await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});

			// document.getElementById("upload-images").close();
		} catch (error) {
			const message = handleClientError(error);
			setErrorMsg(message);
		} finally {
			setSaving(false);
		}
	}

	return (
		<li className="flex gap-2">
			<div className="aspect-square w-14 flex justify-center items-center rounded-md font-bold bg-gray-300">
				<span className="uppercase">.{file.type.split("/")[1]}</span>
			</div>
			<div className="text-sm flex-1">
				<p className="font-bold">{file.name}</p>
				<progress
					className={`progress ${
						progress > 99 ? "progress-success" : "progress-primary"
					} `}
					value={progress}
					max="100"
				></progress>
				<div className="flex flex-wrap gap-5 justify-between">
					<p>
						{(loaded / (1024 * 1024)).toFixed(2)}mb of{" "}
						{(file.size / (1024 * 1024)).toFixed(2)}mb
					</p>
					<p>
						{progress > 99 ? "Success" : "Uploading"}...{progress}%
					</p>
				</div>
				{!!errorMsg ? <p className="text-error">{errorMsg}</p> : null}
				{saving ? (
					<p className="text-xs">Saving to database...</p>
				) : null}
			</div>
		</li>
	);
}

export default memo(ApartmentImages);
