"use client";

import Empty from "@/app/(public)/components/empty";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function ApartmentFeatures({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { features } = queryResponse;

	if (isError) {
		return (
			<>
				<h2>An error occurred</h2>
				<p>{error.message}</p>
			</>
		);
	}

	return (
		<>
			<h2 className="text-2xl font-bold text-slate-600 mb-5">
				Property features
			</h2>
			{isPending ? (
				<Skeleton count={5} />
			) : features && features.length > 0 ? (
				<ul className="flex flex-wrap gap-5 mb-5">
					{features.map((feature, i) => (
						<li
							key={`${feature}-${i}`}
							className="flex gap-2 items-center w-[calc((100%_-_1.25rem)_/_2)]"
						>
							<FiCheckCircle className="w-5 h-5 stroke-success" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			) : (
				<Empty />
			)}
		</>
	);
}

export default ApartmentFeatures;
