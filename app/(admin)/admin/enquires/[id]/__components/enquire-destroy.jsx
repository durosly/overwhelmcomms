"use client";

import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function EnquireDestroy({ id }) {
	const router = useRouter();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting enquire...");
			return axios.delete(`/api/admin/enquiries/${id}`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["enquire"],
			});
		},
		onSuccess: () => {
			toast.success("Enquire Deleted", { id: toastId.current });
			// document.getElementById("delete-customer").close();
			router.push("/admin/enquires");
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
					document.getElementById("delete-enquire").showModal()
				}
				className="btn btn-error btn-block"
			>
				Destory
			</button>
			<dialog
				id="delete-enquire"
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center mb-5">
						<h3 className="font-bold text-lg text-center">
							Are you sure?
						</h3>
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

export default EnquireDestroy;
