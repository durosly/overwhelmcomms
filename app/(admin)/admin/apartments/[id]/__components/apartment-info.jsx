"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useEffect, useRef, useState } from "react";
import { BiBath } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineOtherHouses } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

function ApartmentInfo({ id }) {
	const [property, setProperty] = useState({
		price: "",
		baths: "",
		beds: "",
		space: "",
		location: "",
	});

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (property) => {
			toastId.current = toast.loading("Updating property info...");
			return axios.put(`/api/admin/apartments/${id}/info`, property);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onSuccess: () => {
			toast.success("Property info updated", { id: toastId.current });
			document.getElementById("edit-apartment-info").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(property);
	}

	const queryResponse = data?.data?.apartment || {};
	const { price, baths, beds, space, location } = queryResponse;

	useEffect(() => {
		if (queryResponse?.price) {
			setProperty({ price, baths, beds, space, location });
		}
	}, [queryResponse]);

	if (isError) {
		return (
			<>
				<div className="card bg-base-100 flex-1">
					<div className="card-body">
						<h2 className="card-title">Info</h2>

						<p>An Error occured: {error.message}</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="card bg-base-100 flex-1">
				<div className="card-body">
					<h2 className="card-title">Info</h2>
					<ul className="flex flex-wrap gap-2">
						<li className="flex items-center gap-2 w-[calc((100%_-_0.5rem)_/_2)]">
							<span>&#8358;</span>
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span>{commaNumber(price)}</span>
							)}
						</li>
						<li className="flex items-center gap-2 w-[calc((100%_-_0.5rem)_/_2)]">
							<BiBath />
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span>{commaNumber(baths)}</span>
							)}
						</li>
						<li className="flex items-center gap-2 w-[calc((100%_-_0.5rem)_/_2)]">
							<LuBedSingle />
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span>{commaNumber(beds)}</span>
							)}
						</li>
						<li className="flex items-center gap-2 w-[calc((100%_-_0.5rem)_/_2)]">
							<MdOutlineOtherHouses />
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span>{commaNumber(space)} (sqft)</span>
							)}
						</li>
						<li className="flex items-center gap-2 w-full">
							<FiMapPin />
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span>{location}</span>
							)}
						</li>
					</ul>
					<div className="card-actions">
						<button
							className="btn-primary btn"
							onClick={() =>
								document
									.getElementById("edit-apartment-info")
									.showModal()
							}
							disabled={isPending}
						>
							Update info
						</button>
					</div>
				</div>
			</div>

			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="edit-apartment-info"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Update info</h3>

					<form
						action="/nice"
						onSubmit={handleSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="price"
								className="label"
							>
								Price (&#8358;)
							</label>
							<input
								type="number"
								className="input input-bordered"
								id="price"
								name="price"
								disabled={isPendingMutation}
								value={property.price}
								onChange={(e) =>
									setProperty({
										...property,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="baths"
								className="label"
							>
								No of bathrooms
							</label>
							<input
								type="number"
								className="input input-bordered"
								id="baths"
								name="baths"
								disabled={isPendingMutation}
								value={property.baths}
								onChange={(e) =>
									setProperty({
										...property,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="beds"
								className="label"
							>
								No of beds
							</label>
							<input
								type="number"
								className="input input-bordered"
								id="beds"
								name="beds"
								disabled={isPendingMutation}
								value={property.beds}
								onChange={(e) =>
									setProperty({
										...property,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="space"
								className="label"
							>
								Space (sqft)
							</label>
							<input
								type="number"
								className="input input-bordered"
								id="space"
								name="space"
								disabled={isPendingMutation}
								value={property.space}
								onChange={(e) =>
									setProperty({
										...property,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="location"
								className="label"
							>
								Location
							</label>
							<input
								type="text"
								className="input input-bordered"
								id="location"
								name="location"
								disabled={isPendingMutation}
								value={property.location}
								onChange={(e) =>
									setProperty({
										...property,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<button
							disabled={isPendingMutation}
							className="btn btn-primary mt-4"
						>
							{isPendingMutation ? (
								<>
									<span className="loading loading-spinner"></span>
									<span>Loading...</span>
								</>
							) : (
								"Submit"
							)}
						</button>
					</form>

					<p className="py-4">
						Press ESC key or click outside to close
					</p>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button disabled={isPendingMutation}>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ApartmentInfo;
