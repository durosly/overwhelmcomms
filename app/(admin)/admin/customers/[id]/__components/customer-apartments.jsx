"use client";
import Empty from "@/app/(public)/components/empty";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function CustomerApartments({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["tenants", { customerId: id }, "apartments"],
		queryFn: () => axios(`/api/admin/customers/${id}/apartments`),
	});

	const queryResponse = data?.data || {};
	const { tenants } = queryResponse;

	if (isError) {
		return (
			<div className="flex-1 card bg-base-100">
				<div className="card-body">
					<h2 className="card-title">Apartments</h2>
					<p>Error: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Apartments</h2>
				<ul className="list-inside list-disc">
					{isPending ? (
						Array(4)
							.fill(3)
							.map((_, i) => (
								<li key={i}>
									<Skeleton />
								</li>
							))
					) : tenants & (tenants.length > 0) ? (
						tenants.map((tenant) => (
							<li
								key={tenant._id}
								className="list-item gap-2"
							>
								<Link
									className="link link-hover"
									href={`/admin/apartments/${tenant.apartmentId}`}
								>
									{tenant.apartmentName}
								</Link>
							</li>
						))
					) : (
						<li>
							<Empty message={"No apartment added yet"} />
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

export default CustomerApartments;
