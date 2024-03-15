"use client";
import Link from "next/link";
import { DateTime } from "luxon";

function CustomerRow({ item }) {
	const { name, createdAt, email, phone, _id } = item;
	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div>
						<div className="font-bold">{name}</div>
						<div className="text-sm opacity-50">
							{DateTime.fromISO(createdAt).toLocaleString(
								DateTime.DATETIME_SHORT
							)}
						</div>
					</div>
				</div>
			</td>
			<td>
				{email}
				<br />
				<span className="badge badge-ghost badge-sm">{phone}</span>
			</td>

			<td>
				<Link
					href={`/admin/customers/${_id}`}
					className="btn btn-ghost btn-xs"
				>
					details
				</Link>
			</td>
		</tr>
	);
}

export default CustomerRow;
