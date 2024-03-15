"use client";

import { queryClient } from "@/app/(public)/components/client-wrapper";
import Empty from "@/app/(public)/components/empty";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function ApartmentOccupantDisplay({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["tenants", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}/tenant`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (tenantId) => {
			toastId.current = toast.loading("Removing tenant from property...");
			return axios.delete(`/api/admin/apartments/${id}/tenant`, {
				data: { tenantId },
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["tenants", { apartmentId: id }],
			});
		},
		onSuccess: () => {
			toast.success("Tenant removed from apartment", {
				id: toastId.current,
			});
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const queryResponse = data?.data || {};
	const { tenants } = queryResponse;

	if (isError) {
		return <p>{error.message}</p>;
	}

	return (
		<ul>
			{isPending ? (
				Array(5)
					.fill(4)
					.map((_, i) => (
						<li
							key={i}
							className="max-w-sm"
						>
							<Skeleton />
						</li>
					))
			) : tenants.length > 0 ? (
				tenants.map((t) => (
					<li
						key={t._id}
						className="flex gap-2 items-center"
					>
						<FiCheckCircle className="stroke-success" />
						<span>{t.customerName}</span>

						<button
							disabled={isPendingMutation}
							onClick={() => mutate(t._id)}
							className="btn btn-sm btn-square btn-error"
						>
							<FiTrash2 />
						</button>
					</li>
				))
			) : (
				<li>
					<Empty message={"No tenants added"} />
				</li>
			)}
		</ul>
	);
}

export default ApartmentOccupantDisplay;
