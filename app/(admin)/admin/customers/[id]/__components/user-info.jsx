"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiMail, FiPhone } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function UserInfo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["customers", { customerId: id }],
		queryFn: () => axios(`/api/admin/customers/${id}`),
	});

	const queryResponse = data?.data?.customer || {};

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
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">
					{isPending ? <Skeleton /> : queryResponse.name}
				</h2>
			</div>
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Details</h2>
					<ul className="space-y-2">
						<li className="flex items-center gap-2">
							<FiMail className="w-5 h-5" />
							{isPending ? (
								<Skeleton containerClassName="flex-1 max-w-sm" />
							) : (
								<>
									<a href={`mailto:${queryResponse.email}`}>
										{queryResponse.email}
									</a>
								</>
							)}
						</li>
						<li className="flex items-center gap-2">
							<FiPhone className="w-5 h-5" />
							{isPending ? (
								<Skeleton containerClassName="flex-1 max-w-sm" />
							) : (
								<a href="tel:+2347063069903">+2347063069903</a>
							)}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default UserInfo;
