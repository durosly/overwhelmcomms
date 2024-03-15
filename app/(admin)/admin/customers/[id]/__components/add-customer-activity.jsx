"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function AddCustomerActivity({ id }) {
	const [summary, setSummary] = useState("");
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (summary) => {
			toastId.current = toast.loading("Creating customer activity...");
			return axios.post(`/api/admin/customers/${id}/activity`, {
				summary,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["activity"],
			});
		},
		onSuccess: () => {
			setSummary("");
			toast.success("Customer activity created", { id: toastId.current });
			document.getElementById("add-activity").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(summary);
	}

	return (
		<>
			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("add-activity").showModal()
				}
			>
				Add Activity
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="add-activity"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add new activity</h3>
					<form
						action="/activity"
						onSubmit={handleSubmit}
					>
						<div className="form-control mb-3 mt-5">
							<input
								type="text"
								name="summary"
								disabled={isPending}
								id="summary"
								className="input input-bordered"
								placeholder="Summary of activity..."
								value={summary}
								onChange={(e) => setSummary(e.target.value)}
							/>
						</div>
						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Save
						</button>
					</form>
					<p className="py-4 text-sm">
						Press ESC key or click outside to close
					</p>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default AddCustomerActivity;
