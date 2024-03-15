"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { handleClientError } from "@/lib/utils";
import toast from "react-hot-toast";

function LoginForm() {
	const router = useRouter();
	const [info, setInfo] = useState({ email: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);

	async function makeLoginRequest(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Loading...");
		try {
			setIsLoading(true);
			const res = await signIn("credentials", {
				redirect: false,
				...info,
			});

			if (res && res.ok && !res?.error) {
				toast.success("Login successful", { id: toastId });
				router.push("/admin/dashboard");
				// setIsLoading(false);
			} else {
				throw new Error(res?.error || "Something went wrong");
			}
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId });
			setIsLoading(false);
		}
	}

	return (
		<form
			onSubmit={makeLoginRequest}
			className="card-body"
		>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Email</span>
				</label>
				<input
					type="email"
					name="email"
					placeholder="email"
					disabled={isLoading}
					className="input input-bordered"
					required
					value={info.email}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					name="password"
					disabled={isLoading}
					placeholder="password"
					className="input input-bordered"
					required
					value={info.password}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mt-6">
				<button
					disabled={isLoading}
					className="btn btn-primary"
				>
					Login
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
