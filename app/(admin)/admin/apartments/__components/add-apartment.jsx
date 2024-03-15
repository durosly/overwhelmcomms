"use client";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { handleClientError } from "@/lib/utils";
import { queryClient } from "@/app/(public)/components/client-wrapper";

const initialState = {
	title: "",
	price: "",
	type: "rental",
	beds: "",
	baths: "",
	space: "",
	location: "",
};

function AddApartment() {
	const [apartment, setApartment] = useState(initialState);

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (apartment) => {
			toastId.current = toast.loading("Creating apartment");
			return axios.post("/api/admin/apartments", apartment);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onSuccess: () => {
			setApartment({ ...initialState });
			toast.success("Apartment created", { id: toastId.current });
			document.getElementById("add-apartment").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(apartment);
	}

	return (
		<div>
			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("add-apartment").showModal()
				}
			>
				Add apartment/property
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="add-apartment"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Add new apartment/property
					</h3>
					<form
						action=""
						onSubmit={handleSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="title"
								className="label"
							>
								Title
							</label>
							<input
								type="text"
								name="title"
								id="title"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.title}
								onChange={(e) =>
									setApartment({
										...apartment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="price"
								className="label"
							>
								Price (&#8358;)
							</label>
							<input
								type="number"
								name="price"
								id="price"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.price}
								onChange={(e) =>
									setApartment({
										...apartment,
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
								name="location"
								id="location"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.location}
								onChange={(e) =>
									setApartment({
										...apartment,
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
								name="space"
								id="space"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.space}
								onChange={(e) =>
									setApartment({
										...apartment,
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
								No of baths
							</label>
							<input
								type="number"
								name="baths"
								id="baths"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.baths}
								onChange={(e) =>
									setApartment({
										...apartment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="bed"
								className="label"
							>
								No of beds
							</label>
							<input
								type="number"
								name="beds"
								id="beds"
								disabled={isPending}
								className="input input-bordered"
								value={apartment.beds}
								onChange={(e) =>
									setApartment({
										...apartment,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="divider">Type</div>
						<div className="flex flex-wrap">
							<div className="form-control">
								<label className="label cursor-pointer">
									<span className="label-text mr-3">
										Rental
									</span>
									<input
										type="radio"
										name="type"
										className="radio checked:bg-primary"
										checked={apartment.type === "rental"}
										onChange={(e) =>
											setApartment({
												...apartment,
												[e.target.name]: "rental",
											})
										}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="label cursor-pointer">
									<span className="label-text mr-3">
										Sales
									</span>
									<input
										type="radio"
										name="type"
										className="radio checked:bg-primary"
										checked={apartment.type === "sale"}
										onChange={(e) =>
											setApartment({
												...apartment,
												[e.target.name]: "sale",
											})
										}
									/>
								</label>
							</div>
						</div>

						<button
							disabled={isPending}
							className="btn btn-primary mt-5"
						>
							Create
						</button>
					</form>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>Close</button>
				</form>
			</dialog>
		</div>
	);
}

export default AddApartment;
