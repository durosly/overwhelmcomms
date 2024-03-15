"use client";

import { queryClient } from "@/app/(public)/components/client-wrapper";
import { handleClientError } from "@/lib/utils";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiSearch, FiTrash2 } from "react-icons/fi";
import ApartmentOccupantDisplay from "./apartment-occupant-display";

function ApartmentOccupant({ id }) {
	const [query, setQuery] = useState("");
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["customers", query],
			queryFn: async ({ pageParam }) =>
				axios(`/api/admin/customers?page=${pageParam}&q=${query}`),
			initialPageParam: 1,
			placeholderData: (previousData) => previousData,
			enabled: !!query,
			getNextPageParam: (lastPage, allPages, lastPageParam) => {
				if (lastPage.length === 0) {
					return undefined;
				}
				return lastPageParam + 1;
			},
		});

	const queryResponse = data?.pages || [];

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (customerId) => {
			toastId.current = toast.loading("Adding customer to apartment");
			return axios.post(`/api/admin/apartments/${id}/tenant`, {
				customerId,
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
			toast.success("Customer added to apartment", {
				id: toastId.current,
			});
			setQuery("");
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<div className="card bg-base-100 mb-5">
			<div className="card-body">
				<h2 className="card-title">Owners/Occupants</h2>
				<form
					action="/nice"
					className="relative"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="form-control relative">
						<input
							type="search"
							className="input input-bordered pl-12"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<FiSearch className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-4 pointer-events-none" />
					</div>

					{/* dropdown suggestion */}
					{!!query && queryResponse && queryResponse.length > 0 ? (
						<ul className="absolute shadow-md rounded-md bottom-0 left-0 translate-y-full bg-base-100 p-3 w-full space-y-2 max-h-28 overflow-y-auto">
							{queryResponse.map((page) =>
								page.data.data.docs.map((user) => (
									<li
										key={user._id}
										className="hover:bg-base-200 cursor-pointer p-2 rounded-md disabled:bg-slate-400"
										disabled={isPending}
										onClick={() => mutate(user._id)}
									>
										{user.name}
									</li>
								))
							)}
							<li className="divider"></li>
							{hasNextPage ? (
								<li
									className="btn btn-block btn-sm"
									onClick={() => fetchNextPage()}
									disabled={
										!hasNextPage || isFetchingNextPage
									}
								>
									{isFetchingNextPage
										? "Loading more..."
										: hasNextPage
										? "Load More"
										: "Nothing more to load"}
								</li>
							) : null}
						</ul>
					) : null}
				</form>
				<ApartmentOccupantDisplay id={id} />
			</div>
		</div>
	);
}

export default ApartmentOccupant;
