"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function EnquireTitle({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["enquire", { enquireId: id }],
		queryFn: () => axios(`/api/admin/enquiries/${id}`),
	});

	const queryResponse = data?.data?.enquiry || {};

	const { apartmentTitle } = queryResponse;

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
				{isPending ? <Skeleton /> : <>Enquiry ({apartmentTitle})</>}
			</h2>
		</div>
	);
}

export default EnquireTitle;
