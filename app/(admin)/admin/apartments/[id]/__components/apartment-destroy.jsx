"use client";

import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ApartmentDestroyBtn({ id }) {
	const router = useRouter();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting apartment...");
			return axios.delete(`/api/admin/apartments/${id}`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onSuccess: () => {
			toast.success("Apartment Deleted", { id: toastId.current });
			// document.getElementById("delete-customer").close();
			router.push("/admin/apartments");
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});
	return (
		<>
			<button
				className="btn btn-error btn-block"
				onClick={() =>
					document.getElementById("delete-apartment").showModal()
				}
			>
				Destroy
			</button>

			<dialog
				id="delete-apartment"
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center mb-5">
						<h3 className="font-bold text-lg text-center">
							Are you sure?
						</h3>
						<p>
							Property would be parmanently removed along with all
							related entities e.g images, videos, enquires, etc.
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
					<button disabled={isPending}>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ApartmentDestroyBtn;
