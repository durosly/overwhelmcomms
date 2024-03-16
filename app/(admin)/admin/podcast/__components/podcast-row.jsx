"use client";
import { DateTime } from "luxon";
import PodcastDestroyBtn from "./podcast-destroy";

function PodcastRow({ item }) {
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
				<PodcastDestroyBtn id={_id} />
			</td>
		</tr>
	);
}

export default PodcastRow;
