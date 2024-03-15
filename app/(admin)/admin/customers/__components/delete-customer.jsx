"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function DeleteCustomer({ id }) {
	const router = useRouter();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting customer...");
			return axios.delete(`/api/admin/customers/${id}`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["customers"],
			});
		},
		onSuccess: () => {
			toast.success("Customer Deleted", { id: toastId.current });
			// document.getElementById("delete-customer").close();
			router.push("/admin/customers");
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<>
			<button
				onClick={() =>
					document.getElementById("delete-customer").showModal()
				}
				className="btn btn-error btn-block"
			>
				Destroy
			</button>
			<dialog
				id="delete-customer"
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center mb-5">
						<h3 className="font-bold text-lg text-center">
							Are you sure?
						</h3>
						<p>
							Customer&apos;s account would be parmanently removed
						</p>
					</div>

					<div className="flex gap-5 justify-center">
						<button
							disabled={isPending}
							onClick={mutate}
							className="btn btn-error"
						>
							Yes
						</button>
						<form method="dialog">
							<button
								disabled={isPending}
								className="btn"
							>
								No
							</button>
						</form>
					</div>
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

export default DeleteCustomer;
