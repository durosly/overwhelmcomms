"use client";

import { DateTime } from "luxon";
import Link from "next/link";

function EnquireRow({ enquire }) {
	return (
		<tr>
			<td className="font-bold">
				{DateTime.fromISO(enquire.createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</td>
			<td>
				{enquire.message.length > 30
					? enquire.message.substring(0, 30) + "..."
					: enquire.message}
			</td>
			<td>{enquire.phone}</td>
			<th>
				<Link
					href={`/admin/enquires/${enquire._id}`}
					className="btn btn-ghost btn-xs"
				>
					details
				</Link>
			</th>
		</tr>
	);
}

export default EnquireRow;
