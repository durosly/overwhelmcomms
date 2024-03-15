"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";

import Skeleton from "react-loading-skeleton";
import EnquireRow from "./enquire-row";

function DisplayEnquiries() {
	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["enquiries", page],
			queryFn: () => axios(`/api/admin/enquiries?page=${page}`),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || {};
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;

	return (
		<>
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
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>Date</th>
								<th>Message summary</th>
								<th>Phone</th>
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
											<td colSpan={4}>
												<Skeleton />
											</td>
										</tr>
									))
							) : isError ? (
								<tr key={i}>
									<td
										colSpan={4}
										className="text-error font-bold"
									>
										{error}
									</td>
								</tr>
							) : (
								<>
									{docs.length > 0 ? (
										docs.map((item) => (
											<EnquireRow
												enquire={item}
												key={item._id}
											/>
										))
									) : (
										<tr>
											<td>No enquire found</td>
										</tr>
									)}
								</>
							)}
							{isFetching ? (
								<tr>
									<td colSpan={4}>
										<span className="loading loading-spinner"></span>
										<span> Loading...</span>
									</td>
								</tr>
							) : null}
						</tbody>
						{/* foot */}
						<tfoot>
							<tr>
								<th>Date</th>
								<th>Message summary</th>
								<th>Phone</th>
								<th></th>
							</tr>
						</tfoot>
					</table>
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

export default DisplayEnquiries;
