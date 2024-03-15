"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { FiUsers } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function TotalCustomer() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["customers", "count"],
		queryFn: () => axios(`/api/admin/customers/count`),
	});

	const queryResponse = data?.data?.count || 0;

	return (
		<div className="flex-1 card bg-base-100">
			<div className="card-body ">
				<FiUsers className="w-7 h-7 stroke-blue-600" />
				<p>Customers</p>
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

export default TotalCustomer;
