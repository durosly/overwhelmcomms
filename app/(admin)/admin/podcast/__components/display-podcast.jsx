"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import PodcastRow from "./podcast-row";

function DisplayPodcast() {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["podcast", page, query],
			queryFn: () => axios(`/api/admin/podcast?page=${page}&q=${query}`),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || {};
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;

	return (
		<>
			<form
				action="/nice"
				className="my-5"
			>
				<div className="form-control relative">
					<input
						type="search"
						name="query"
						id="query"
						className="input input-bordered max-sm:mb-2 w-full join-item pl-12"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<FiSearch className="w-5 h-5 stroke-slate-300 absolute top-4 left-4" />
				</div>
			</form>
			<div className="text-right flex font-bold mb-5">
				<div className="w-72 ml-auto">
					{isPending ? (
						<Skeleton />
					) : (
						<span>
							{Math.max(1, limit * (page - 1))} -{" "}
							{limit * (page - 1) + docs.length} of{" "}
							{commaNumber(totalDocs)}
						</span>
					)}
				</div>
			</div>
			<div className="card bg-base-100">
				<div className="card-body">
					<div className="overflow-x-auto">
						<table className="table ">
							{/* head */}
							<thead>
								<tr>
									<th>Title</th>
									<th>Category</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{isPending ? (
									Array(4)
										.fill(3)
										.map((_, i) => (
											<tr key={i}>
												<td colSpan={3}>
													<Skeleton />
												</td>
											</tr>
										))
								) : isError ? (
									<tr key={i}>
										<td
											colSpan={3}
											className="text-error font-bold"
										>
											{handleClientError(error)}
										</td>
									</tr>
								) : (
									<>
										{docs.length > 0 ? (
											docs.map((item) => (
												<PodcastRow
													item={item}
													key={item._id}
												/>
											))
										) : (
											<tr>
												<td colSpan={3}>
													No item found
												</td>
											</tr>
										)}
									</>
								)}
								{isFetching ? (
									<tr>
										<td colSpan={3}>
											<span className="loading loading-spinner"></span>
											<span> Loading...</span>
										</td>
									</tr>
								) : null}
							</tbody>
							{/* foot */}
							<tfoot>
								<tr>
									<th>Title</th>
									<th>Category</th>
									<th></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>

			<div className="text-center space-x-5 mt-5">
				<button
					disabled={!hasPrevPage}
					className=" btn btn-sm btn-outline"
					onClick={() => setPage((old) => Math.max(old - 1, 0))}
				>
					<FiChevronLeft />
				</button>
				<span className="">Page {page}</span>
				<button
					disabled={!hasNextPage || isPlaceholderData}
					className="btn btn-sm btn-outline"
					onClick={() => {
						if (!isPlaceholderData && hasNextPage) {
							setPage((old) => old + 1);
						}
					}}
				>
					<FiChevronRight />
				</button>
			</div>
		</>
	);
}

export default DisplayPodcast;
