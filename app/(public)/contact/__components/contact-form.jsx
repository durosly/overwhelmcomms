"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import FadeAnimation from "@/components/fade-animation";

const initialData = {
	name: "",
	email: "",
	phone: "",
	message: "",
	subject: "",
};

function ContactForm() {
	const [data, setData] = useState(initialData);

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Saving message...");
			return axios.post(`/api/message`, data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			toast.success(
				"Message saved. We would get back to you as soon as possible",
				{
					id: toastId.current,
				}
			);
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
		<FadeAnimation
			top
			cascade
		>
			<form
				action=""
				onSubmit={handleSubmit}
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
						disabled={isPending}
						value={data.name}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control">
					<label
						htmlFor="email"
						className="label justify-start"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="input input-bordered"
						disabled={isPending}
						value={data.email}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control">
					<label
						htmlFor="phone"
						className="label justify-start"
					>
						Phone<span className="text-error">*</span>
					</label>
					<input
						type="tel"
						name="phone"
						id="phone"
						className="input input-bordered"
						disabled={isPending}
						value={data.phone}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control">
					<label
						htmlFor="subject"
						className="label justify-start"
					>
						Subject<span className="text-error">*</span>
					</label>
					<input
						type="text"
						name="subject"
						id="subject"
						className="input input-bordered"
						disabled={isPending}
						value={data.subject}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control">
					<label
						htmlFor="message"
						className="label justify-start"
					>
						Message<span className="text-error">*</span>
					</label>

					<textarea
						name="message"
						id="message"
						className="textarea textarea-bordered"
						rows={5}
						disabled={isPending}
						value={data.message}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					></textarea>
				</div>
				<button
					disabled={isPending}
					className="btn btn-primary btn-block mt-10"
				>
					Send
				</button>
			</form>
		</FadeAnimation>
	);
}

export default ContactForm;
