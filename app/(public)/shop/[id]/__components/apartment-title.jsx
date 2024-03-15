"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function ApartmentTitle({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { title } = queryResponse;

	if (isError) {
		return <p>An Error occured: {error.message}</p>;
	}
	return (
		<h2 className="text-4xl font-bold my-5">
			{isPending ? <Skeleton /> : title}
		</h2>
	);
}

export default ApartmentTitle;
