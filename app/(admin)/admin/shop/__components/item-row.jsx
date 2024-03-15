"use client";
import Link from "next/link";
import { DateTime } from "luxon";

function ItemRow({ item }) {
	const { title, createdAt, _id, category, status } = item;
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
			<td>{category}</td>
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
					href={`/admin/shop/${_id}`}
					className="btn btn-ghost btn-xs"
				>
					details
				</Link>
			</td>
		</tr>
	);
}

export default ItemRow;
