"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiLock, FiMail } from "react-icons/fi";

function AuthForm() {
	const [data, setData] = useState({ email: "", password: "" });

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Updating credentials");
			return axios.put("/api/admin/auth", data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			toast.success("Credentials updated", { id: toastId.current });
			signOut();
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
			action="/settings"
			onSubmit={handleSubmit}
		>
			<div className="form-control relative mb-5">
				<input
					type="email"
					name="email"
					id="email"
					className="input input-bordered pl-14"
					disabled={isPending}
					value={data.email}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
				<FiMail className="w-5 h-5 stroke-slate-400 absolute top-1/2 -translate-y-1/2 left-5" />
			</div>
			<div className="form-control relative mb-5">
				<input
					type="password"
					name="password"
					id="password"
					className="input input-bordered pl-14"
					disabled={isPending}
					value={data.password}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
				<FiLock className="w-5 h-5 stroke-slate-400 absolute top-1/2 -translate-y-1/2 left-5" />
			</div>
			<button
				disabled={isPending}
				className="btn btn-primary"
			>
				Update
			</button>
		</form>
	);
}

export default AuthForm;
