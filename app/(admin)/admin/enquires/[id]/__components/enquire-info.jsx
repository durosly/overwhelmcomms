"use client";

import { FiUser, FiMail, FiPhone, FiHome } from "react-icons/fi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function EnquireInfo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["enquire", { enquireId: id }],
		queryFn: () => axios(`/api/admin/enquiries/${id}`),
	});

	const queryResponse = data?.data?.enquiry || {};

	const { name, email, phone, apartmentTitle, apartmentId } = queryResponse;

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
		<ul className="space-y-2">
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
					<li className="flex items-center gap-2">
						<FiUser className="w-5 h-5" />
						<span>{name}</span>
					</li>
					<li className="flex items-center gap-2">
						<FiMail className="w-5 h-5" />
						<a href={`mailto:${email}`}>{email ?? "nil"}</a>
					</li>
					<li className="flex items-center gap-2">
						<FiPhone className="w-5 h-5" />
						<a href={`tel:${phone}`}>{phone}</a>
					</li>
					<li className="flex items-center gap-2">
						<FiHome className="w-5 h-5" />
						<Link
							className="link"
							href={`/admin/apartments/${apartmentId}`}
						>
							{apartmentTitle}
						</Link>
					</li>
				</>
			)}
		</ul>
	);
}

export default EnquireInfo;
