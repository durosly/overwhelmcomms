"use client";

import Empty from "@/app/(public)/components/empty";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FiVideo, FiTrash2 } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import toast from "react-hot-toast";

function ApartmentVideo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting property video...");
			return axios.delete(`/api/admin/apartments/${id}/video`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments", { apartmentId: id }],
			});
		},
		onSuccess: () => {
			toast.success("Property video deleted", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const queryResponse = data?.data?.apartment || {};
	const { video: dbVideo } = queryResponse;

	if (isError) {
		return (
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Video</h2>
					<p>Error occured: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Video</h2>
					<div className="relative max-w-sm">
						{isPending ? (
							<Skeleton className="max-w-sm aspect-video" />
						) : null}
						{!!dbVideo ? (
							<>
								<button
									disabled={isPendingMutation}
									onClick={() => mutate()}
									className="absolute top-2 right-2 z-10 btn btn-xs btn-error btn-square"
								>
									<FiTrash2 />
								</button>
								<video
									className="w-full sm:max-w-sm"
									controls
									src={`${process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_URL}${dbVideo}`}
								></video>
							</>
						) : null}

						{!isPending && !dbVideo ? (
							<Empty
								message={"No video uploaded"}
								center={false}
							/>
						) : null}
					</div>
					<div className="card-actions">
						<button
							onClick={() =>
								document
									.getElementById("upload-video")
									.showModal()
							}
							className="btn btn-primary"
						>
							Upload
						</button>
					</div>
				</div>
			</div>

			<UploadFileModal id={id} />
		</>
	);
}

function UploadFileModal({ id }) {
	const [files, setFiles] = useState([]);

	function removeFile() {
		setFiles([]);
	}

	return (
		<dialog
			id="upload-video"
			className="modal"
		>
			<div className="modal-box">
				<h3 className="font-bold text-lg">Upload Video</h3>

				<div>
					<DropImageZone setFiles={setFiles} />
					<ul className="space-y-2">
						{files.map((file, i) => (
							<UploadFile
								key={`${file.path}-${i}`}
								file={file}
								id={id}
								removeFile={removeFile}
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
			"video/*": [],
		},
		maxFiles: 1,
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
			<FiVideo
				className={`w-20 h-20 mx-auto ${
					isDragActive ? "stroke-primary/30" : "stroke-gray-300"
				} `}
			/>
			<p>Drag video here or click to upload</p>
		</div>
	);
}

function UploadFile({ file, id, removeFile, position }) {
	const initialized = useRef(false);

	const [isUploading, setIsUploading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [saving, setSaving] = useState(false);
	const [loaded, setLoaded] = useState(0);
	const [progress, setProgress] = useState(0);
	const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CNAME}/video/upload`;
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
				`/api/admin/apartments/${id}/video`,
				{ video: public_id }
			);
			if (!response?.data?.status) throw new Error("Saving to DB Error");

			removeFile();
			await queryClient.invalidateQueries({
				queryKey: ["apartments", { apartmentId: id }],
			});

			document.getElementById("upload-video").close();
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

export default ApartmentVideo;
