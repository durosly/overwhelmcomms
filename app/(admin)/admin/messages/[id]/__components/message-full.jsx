"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function MessageFull({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["messages", { messageId: id }],
		queryFn: () => axios(`/api/admin/messages/${id}`),
	});

	const queryResponse = data?.data?.data || {};

	const { message } = queryResponse;

	if (isError) {
		return <p>Error ({error.message})</p>;
	}

	return <p>{isPending ? <Skeleton count={3} /> : message}</p>;
}

export default MessageFull;
