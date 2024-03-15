"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function MessageTitle({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["messages", { messageId: id }],
		queryFn: () => axios(`/api/admin/messages/${id}`),
	});

	const queryResponse = data?.data?.data || {};

	const { subject } = queryResponse;

	if (isError) {
		return (
			<>
				<div className="mb-5">
					<h2 className="text-2xl font-bold">
						Error ({error.message})
					</h2>
				</div>
			</>
		);
	}

	return (
		<div className="mb-5">
			<h2 className="text-2xl font-bold">
				{isPending ? <Skeleton /> : subject}
			</h2>
		</div>
	);
}

export default MessageTitle;
