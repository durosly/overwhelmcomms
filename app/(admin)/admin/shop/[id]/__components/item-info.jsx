"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import { LuContainer } from "react-icons/lu";

function ItemInfo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["items", { itemId: id }],
		queryFn: () => axios(`/api/admin/item/${id}`),
	});

	const queryResponse = data?.data?.item || {};
	const { title, desc, category } = queryResponse;

	if (isError) {
		return (
			<>
				<div className="card bg-base-100 flex-1">
					<div className="card-body">
						<h2 className="card-title">Info</h2>

						<p>An Error occured: {error.message}</p>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="card bg-base-100 flex-1">
				<div className="card-body">
					<h2 className="card-title">Info</h2>
					<ul className="flex flex-col gap-2">
						<li className="flex items-center gap-2">
							<span>Title:</span>
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span className="font-bold">{title}</span>
							)}
						</li>
						<li className="flex items-center gap-2">
							<span>Category:</span>
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span className="font-bold">{category}</span>
							)}
						</li>
						<li className="flex items-center gap-2">
							<span>Description:</span>
							{isPending ? (
								<Skeleton containerClassName="flex-1" />
							) : (
								<span className="font-bold">{desc}</span>
							)}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default ItemInfo;
