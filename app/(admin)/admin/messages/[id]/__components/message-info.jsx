"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { FiCalendar, FiMail, FiPhone, FiUser } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

function MessageInfo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["messages", { messageId: id }],
		queryFn: () => axios(`/api/admin/messages/${id}`),
	});

	const queryResponse = data?.data?.data || {};

	const { name, email, phone, createdAt } = queryResponse;

	if (isError) {
		return (
			<>
				<ul className="mb-5">
					<li className="text-2xl font-bold">
						Error ({error.message})
					</li>
				</ul>
			</>
		);
	}

	return (
		<ul>
			{isPending ? (
				Array(4)
					.fill(3)
					.map((_, i) => (
						<li key={i}>
							<Skeleton />
						</li>
					))
			) : (
				<>
					<li className="flex justify-end gap-2">
						<FiCalendar className="w-4 h-4 stroke-slate-500" />
						<span className="text-slate-500 text-sm italic">
							{DateTime.fromISO(createdAt).toLocaleString(
								DateTime.DATETIME_SHORT
							)}
						</span>
					</li>
					<li className="flex gap-2">
						<FiUser className="w-5 h-5" />
						<span>{name}</span>
					</li>
					<li className="flex gap-2">
						<FiMail className="w-5 h-5" />
						<a href={`mailto:${email}`}>{email ?? "nil"}</a>
					</li>
					<li className="flex gap-2">
						<FiPhone className="w-5 h-5" />
						<a href={`tel:${phone}`}>{phone}</a>
					</li>
				</>
			)}
		</ul>
	);
}

export default MessageInfo;
