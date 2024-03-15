"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function EnquireMessage({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["enquire", { enquireId: id }],
		queryFn: () => axios(`/api/admin/enquiries/${id}`),
	});

	const queryResponse = data?.data?.enquiry || {};

	const { message } = queryResponse;

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

	return <p>{isPending ? <Skeleton count={3} /> : message}</p>;
}

export default EnquireMessage;
