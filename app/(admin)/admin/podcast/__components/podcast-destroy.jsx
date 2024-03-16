"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
// import { useRouter } from "next/navigation";

function PodcastDestroyBtn({ id }) {
	const queryClient = useQueryClient();
	// const router = useRouter();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting podcast...");
			return axios.delete(`/api/admin/podcast/${id}`);
		},
		onSuccess: async () => {
			toast.success("Podcast Deleted", { id: toastId.current });
			document.getElementById(`delete-podcast-${id}`).close();
			// router.push("/admin/shop");
			return await queryClient.invalidateQueries({
				queryKey: ["podcast"],
			});
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<>
			<button
				className="btn btn-error"
				onClick={() =>
					document.getElementById(`delete-podcast-${id}`).showModal()
				}
			>
				<FiTrash />
			</button>

			<dialog
				id={`delete-podcast-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center mb-5">
						<h3 className="font-bold text-lg text-center">
							Are you sure?
						</h3>
						<p>
							Property would be parmanently removed along with all
							related entities e.g images, etc.
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

export default PodcastDestroyBtn;
