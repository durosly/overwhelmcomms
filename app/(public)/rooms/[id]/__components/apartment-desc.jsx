"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { BiBath } from "react-icons/bi";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineOtherHouses } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

function ApartmentDesc({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { description } = queryResponse;

	const [showAll, setShowAll] = useState(false);

	return (
		<div className="flex-1 self-start bg-white p-10 rounded-3xl">
			<h2 className="text-2xl font-bold text-slate-800">
				Property description
			</h2>
			{/* max-h-80 overflow-y-auto */}
			<div
				className={`${
					showAll
						? "max-h-80 overflow-y-auto"
						: "max-h-40 overflow-hidden"
				}`}
			>
				<pre className="overflow-x-auto whitespace-pre-wrap break-words font-roboto">
					{isPending ? (
						<Skeleton
							count={5}
							containerClassName="h-20"
						/>
					) : (
						description || "**No description specified yet**"
					)}
				</pre>
				<div className="bg-white pointer-events-none sticky bottom-0 flex h-20 [mask-image:linear-gradient(transparent,#000000)]"></div>
			</div>
			{!isPending && !isError ? (
				<button
					onClick={() => setShowAll((prev) => !prev)}
					className="btn btn-primary btn-sm"
				>
					{showAll ? (
						<>
							Show Less <FiChevronUp />
						</>
					) : (
						<>
							Read more <FiChevronDown />
						</>
					)}
				</button>
			) : null}
		</div>
	);
}

export default ApartmentDesc;
