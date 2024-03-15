"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function ItemTitle({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["items", { itemId: id }],
		queryFn: () => axios(`/api/admin/item/${id}`),
	});

	const queryResponse = data?.data?.item || {};
	const { title } = queryResponse;

	if (isError) {
		return (
			<>
				<div className="mb-5">
					<h2 className="text-2xl font-bold">Error</h2>
				</div>
				<div className="card bg-base-100 mb-5">
					<div className="card-body">
						<p>An Error occured: {error.message}</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className="mb-5">
			<h2 className="text-2xl font-bold">
				{isPending ? <Skeleton /> : title}
			</h2>
		</div>
	);
}

export default ItemTitle;
