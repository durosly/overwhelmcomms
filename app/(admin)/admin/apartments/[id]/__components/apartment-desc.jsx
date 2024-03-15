"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useEffect, useRef } from "react";

function ApartmentDescription({ id }) {
	const [description, setDescription] = useState("");
	const [edit, setEdit] = useState(false);

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (description) => {
			toastId.current = toast.loading("Updating property description...");
			return axios.put(`/api/admin/apartments/${id}/description`, {
				description,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onSuccess: () => {
			toast.success("Property description updated", {
				id: toastId.current,
			});
			setEdit(false);
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(description);
	}

	const queryResponse = data?.data?.apartment || {};
	const { description: dbDescription } = queryResponse;

	useEffect(() => {
		if (queryResponse?.description) {
			setDescription(dbDescription);
		}
	}, [queryResponse]);

	if (isError) {
		return (
			<>
				<div className="card bg-base-100 mb-5">
					<div className="card-body">
						<h2 className="card-title">Info</h2>

						<p>An Error occured: {error.message}</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="card bg-base-100 mb-5">
			<div className="card-body">
				<h2 className="card-title">Description</h2>
				{edit ? (
					<form
						action="/nice"
						onSubmit={handleSubmit}
					>
						<div className="form-control mb-3">
							<textarea
								name="description"
								id="description"
								rows="5"
								className="textarea textarea-bordered"
								disabled={isPendingMutation}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className="flex gap-2 flex-wrap">
							<button
								disabled={isPendingMutation}
								className="btn btn-primary"
							>
								Save
							</button>
							<button
								className="btn"
								type="button"
								disabled={isPendingMutation}
								onClick={() => setEdit(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				) : (
					<>
						<pre className="overflow-x-auto whitespace-pre-wrap break-words font-roboto">
							{isPending ? (
								<Skeleton
									count={5}
									containerClassName="h-20"
								/>
							) : (
								dbDescription ||
								"**No description specified yet**"
							)}
						</pre>
						<button
							onClick={() => setEdit(true)}
							className="btn btn-sm btn-primary"
							disabled={isPending}
						>
							Edit
						</button>
					</>
				)}
			</div>
		</div>
	);
}

export default ApartmentDescription;
