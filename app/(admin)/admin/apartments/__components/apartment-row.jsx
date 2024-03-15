"use client";
import Link from "next/link";
import { DateTime } from "luxon";
import commaNumber from "comma-number";

function ApartmentRow({ item }) {
	const { title, createdAt, price, location, _id, type, status } = item;
	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-bold">{title}</div>
						<div className="text-sm opacity-50">
							{DateTime.fromISO(createdAt).toLocaleString(
								DateTime.DATETIME_SHORT
							)}
						</div>
					</div>
				</div>
			</td>
			<td>
				{commaNumber(price)}
				<br />
				<span className="badge badge-ghost badge-sm">{location}</span>
			</td>
			<td>{type}</td>
			<td>
				<span
					className={`badge badge-md ${
						status === "hidden"
							? "badge-error"
							: status === "unavailable"
							? "badge-warning"
							: "badge-success"
					}`}
				>
					{status}
				</span>
			</td>

			<td>
				<Link
					href={`/admin/apartments/${_id}`}
					className="btn btn-ghost btn-xs"
				>
					details
				</Link>
			</td>
		</tr>
	);
}

export default ApartmentRow;
