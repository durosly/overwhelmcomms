"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Empty from "@/app/(public)/components/empty";
import Skeleton from "react-loading-skeleton";
import AddCustomerActivity from "./add-customer-activity";
import ActivityRow from "./activity-row";

function CustomerActivities({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["activity"],
		queryFn: () => axios(`/api/admin/customers/${id}/activity`),
	});

	const queryResponse = data?.data?.activities || [];

	return (
		<div className="card bg-base-100 mb-5">
			<div className="card-body">
				<h2 className="card-title">Activities</h2>
				{isError ? (
					<p>An error occured: {error.message}</p>
				) : (
					<div className="overflow-x-auto">
						<table className="table table-zebra">
							{/* head */}
							<thead>
								<tr>
									<th></th>

									<th>Summary</th>
									<th>Date/time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{isPending
									? Array(3)
											.fill(3)
											.map((_, i) => (
												<tr key={i}>
													<th colSpan={4}>
														<Skeleton />
													</th>
												</tr>
											))
									: queryResponse.map((activity, i) => (
											<ActivityRow
												key={activity._id}
												id={id}
												count={i + 1}
												activity={activity}
											/>
									  ))}
							</tbody>
						</table>
					</div>
				)}

				{!isPending && queryResponse.length < 1 ? (
					<Empty message="No activities found" />
				) : null}

				<div className="card-actions">
					<AddCustomerActivity id={id} />
				</div>
			</div>
		</div>
	);
}

export default CustomerActivities;
