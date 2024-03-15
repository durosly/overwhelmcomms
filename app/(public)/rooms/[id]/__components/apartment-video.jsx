"use client";

import Empty from "@/app/(public)/components/empty";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function ApartmentVideo({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/admin/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { video } = queryResponse;

	if (isError) {
		return (
			<div className=" mb-5">
				<h2 className="card-title">Video</h2>
				<p>Error occured: {error.message}</p>
			</div>
		);
	}

	return (
		<div>
			<h4 className="text-2xl font-bold text-slate-600 mb-5">
				Video review
			</h4>
			{isPending ? <Skeleton className="max-w-sm aspect-video" /> : null}
			{!isPending && !video ? (
				<Empty
					message={"No video uploaded"}
					center
				/>
			) : null}
			{!!video ? (
				<div className="relative">
					<video
						className="w-full "
						controls
						src={`${process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_URL}${video}`}
					></video>
				</div>
			) : null}
		</div>
	);
}

export default ApartmentVideo;
