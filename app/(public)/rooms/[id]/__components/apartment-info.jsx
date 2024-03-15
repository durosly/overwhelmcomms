"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineOtherHouses } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import ShareBtn from "./share-btn";
import { metaInfo } from "@/app/meta";

function ApartmentInfo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { title, baths, beds, space, description } = queryResponse;

	if (isError) {
		return (
			<div className="flex justify-between gap-5 flex-wrap items-center mb-10">
				<p>Error occured</p>
			</div>
		);
	}

	return (
		<div className="flex justify-between gap-5 flex-wrap items-center mb-10">
			<div className="flex gap-4 text-slate-400">
				<div className="flex-1 flex gap-1">
					<BiBath className="w-5 h-5 " />

					{isPending ? (
						<Skeleton containerClassName="flex-1 w-20" />
					) : (
						<span className="whitespace-nowrap">
							{commaNumber(baths)}
						</span>
					)}
				</div>
				<div className="flex-1 flex gap-1">
					<LuBedSingle className="w-5 h-5 " />

					{isPending ? (
						<Skeleton containerClassName="flex-1 w-20" />
					) : (
						<span className="whitespace-nowrap">
							{commaNumber(beds)}
						</span>
					)}
				</div>
				<div className="flex-1 flex gap-1">
					<MdOutlineOtherHouses className="w-5 h-5 " />

					{isPending ? (
						<Skeleton containerClassName="flex-1 w-20" />
					) : (
						<span className="whitespace-nowrap">
							{commaNumber(space)} (sqft)
						</span>
					)}
				</div>
			</div>
			<div>
				{isPending ? (
					<Skeleton
						containerClassName="text-2xl w-10"
						className="w-full h-10"
					/>
				) : (
					<ShareBtn
						title={title}
						description={description || metaInfo.description}
					/>
				)}
			</div>
		</div>
	);
}

export default ApartmentInfo;
