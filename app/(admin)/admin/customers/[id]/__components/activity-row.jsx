"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

function ActivityRow({ count, activity, id }) {
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (activity_id) => {
			toastId.current = toast.loading("Deleting customer activity...");
			return axios.delete(
				`/api/admin/customers/${id}/activity/${activity_id}`
			);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["activity"],
			});
		},
		onSuccess: () => {
			toast.success("Customer activity Deleted", { id: toastId.current });
			document.getElementById("add-activity").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<tr key={activity._id}>
			<th>{count}</th>

			<td>{activity.summary}</td>
			<td>
				{DateTime.fromISO(activity.createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td>
				<button
					disabled={isPending}
					onClick={() => mutate(activity._id)}
					className="btn btn-outline btn-xs btn-error ml-2"
				>
					<FiTrash2 />
				</button>
			</td>
		</tr>
	);
}

export default ActivityRow;
