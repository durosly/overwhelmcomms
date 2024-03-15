"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { FiHome } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function TotalProperties() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", "count"],
		queryFn: () => axios(`/api/admin/apartments/count`),
	});

	const queryResponse = data?.data?.count || 0;

	return (
		<div className="flex-1 card bg-base-100">
			<div className="card-body ">
				<FiHome className="w-7 h-7 stroke-green-600" />
				<p>Total properties</p>
				{isError ? (
					<p>{error.message} </p>
				) : (
					<p className="text-4xl font-bold">
						{isPending ? <Skeleton /> : commaNumber(queryResponse)}
					</p>
				)}
			</div>
		</div>
	);
}

export default TotalProperties;
