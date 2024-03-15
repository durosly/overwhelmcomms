"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const initialData = {
	name: "",
	email: "",
	phone: "",
	message: "",
};

function ApartmentEnquireForm({ id }) {
	const [data, setData] = useState(initialData);

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Sending enquiry...");
			return axios.post(`/api/apartments/${id}/enquire`, data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			toast.success("Enquiry sent", {
				id: toastId.current,
			});
			setData({ ...initialData });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(data);
	}

	return (
		<form
			onSubmit={handleSubmit}
			action="/enquire"
		>
			<div className="form-control">
				<label
					htmlFor="name"
					className="label justify-start"
				>
					Name<span className="text-error">*</span>
				</label>
				<input
					type="text"
					name="name"
					id="name"
					className="input input-bordered"
					disabled={isPendingMutation}
					value={data.name}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="email"
					className="label justify-start"
				>
					E-mail
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="input input-bordered"
					disabled={isPendingMutation}
					value={data.email}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="phone"
					className="label justify-start"
				>
					Phonenumber<span className="text-error">*</span>
				</label>
				<input
					type="tel"
					name="phone"
					id="phone"
					className="input input-bordered"
					disabled={isPendingMutation}
					value={data.phone}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="message"
					className="label justify-start"
				>
					Message<span className="text-error">*</span>
				</label>

				<textarea
					className="textarea textarea-bordered"
					name="message"
					id="message"
					rows="4"
					disabled={isPendingMutation}
					value={data.message}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				></textarea>
			</div>
			<button
				disabled={isPendingMutation}
				className="btn btn-primary btn-block"
			>
				Send
			</button>
		</form>
	);
}

export default ApartmentEnquireForm;
