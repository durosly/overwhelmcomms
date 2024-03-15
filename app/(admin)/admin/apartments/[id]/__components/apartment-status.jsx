"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";

function ApartmentStatus({ id }) {
	const [status, setStatus] = useState("hidden");

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (status) => {
			toastId.current = toast.loading("Updating property status...");
			return axios.put(`/api/admin/apartments/${id}/status`, { status });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onSuccess: () => {
			toast.success("Property status updated", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(status);
	}

	const queryResponse = data?.data?.apartment || {};
	const { status: dbStatus } = queryResponse;

	useEffect(() => {
		if (queryResponse?.price) {
			setStatus(dbStatus);
		}
	}, [queryResponse]);

	if (isError) {
		return (
			<>
				<div className="card bg-base-100 flex-1">
					<div className="card-body">
						<h2 className="card-title">Info</h2>

						<p>An Error occured: {error.message}</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="card bg-base-100 flex-1">
			<div className="card-body">
				<h2 className="card-title">Status</h2>
				{isPending ? (
					<Skeleton containerClassName="flex max-w-[90px] rounded-md" />
				) : (
					<span
						className={`badge badge-md ${
							dbStatus === "hidden"
								? "badge-error"
								: dbStatus === "unavailable"
								? "badge-warning"
								: "badge-success"
						}`}
					>
						{dbStatus}
					</span>
				)}

				<div className="divider"></div>
				<form
					action="/nice"
					className="flex flex-wrap gap-2"
					onSubmit={handleSubmit}
				>
					<div className="form-control mb-3 flex-1">
						<select
							name="status"
							id="status"
							className="select select-bordered"
							disabled={isPending || isPendingMutation}
							value={status}
							onChange={(e) => setStatus(e.target.value)}
						>
							<option value="hidden">Hidden</option>
							<option value="unavailable">Unavailable</option>
							<option value="available">Available</option>
						</select>
					</div>
					<button
						disabled={isPending || isPendingMutation}
						className="btn btn-primary"
					>
						{isPendingMutation ? (
							<>
								<span className="loading loading-spinner"></span>
								<span>Loading...</span>
							</>
						) : (
							"Update status"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ApartmentStatus;
