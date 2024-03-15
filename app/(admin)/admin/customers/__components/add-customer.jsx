"use client";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { handleClientError } from "@/lib/utils";
import { queryClient } from "@/app/(public)/components/client-wrapper";

const initialState = {
	name: "",
	email: "",
	phone: "",
};

function AddCustomer() {
	const [customer, setCustomer] = useState(initialState);

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (user) => {
			toastId.current = toast.loading("Creating customer");
			return axios.post("/api/admin/customers", user);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["customers"],
			});
		},
		onSuccess: () => {
			setCustomer({ ...initialState });
			toast.success("Customer created", { id: toastId.current });
			document.getElementById("my_modal_2").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(customer);
	}

	return (
		<div>
			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("my_modal_2").showModal()
				}
			>
				Add customer
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="my_modal_2"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add new customer</h3>
					<form
						action=""
						onSubmit={handleSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="name"
								className="label"
							>
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								disabled={isPending}
								className="input input-bordered"
								value={customer.name}
								onChange={(e) =>
									setCustomer({
										...customer,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="email"
								className="label"
							>
								E-mail
							</label>
							<input
								type="email"
								name="email"
								id="email"
								disabled={isPending}
								className="input input-bordered"
								value={customer.email}
								onChange={(e) =>
									setCustomer({
										...customer,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control mb-3">
							<label
								htmlFor="phone"
								className="label"
							>
								Phonenumber
							</label>
							<input
								type="tel"
								name="phone"
								id="phone"
								className="input input-bordered"
								value={customer.phone}
								disabled={isPending}
								onChange={(e) =>
									setCustomer({
										...customer,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Add
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

export default AddCustomer;
