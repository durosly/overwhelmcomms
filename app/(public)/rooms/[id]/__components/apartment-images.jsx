"use client";

import Empty from "@/app/(public)/components/empty";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function ApartmentImages({ id }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["apartments", { apartmentId: id }],
		queryFn: () => axios(`/api/apartments/${id}`),
	});

	const queryResponse = data?.data?.apartment || {};
	const { images } = queryResponse;

	const [mainImg, setMainImg] = useState("default");

	useEffect(() => {
		if (images && images.length) {
			setMainImg(images[0]);
		}
	}, [images]);

	if (isError) {
		return (
			<div className="flex-1 ">
				<div className="card-body">
					<h2 className="card-title">Images</h2>
					<p>Error: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1">
			<div className="relative h-96 rounded-2xl overflow-hidden mb-5">
				{isPending ? (
					<Skeleton
						containerClassName="absolute top-0 left-0 w-full h-full"
						className="h-full w-full"
					/>
				) : (
					<Image
						src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${mainImg}`}
						fill
						alt="room title"
						className="object-cover"
					/>
				)}
			</div>

			<div className="flex gap-5 max-[400px]:w-[calc(100%_-_40px)] max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-x-auto">
				{isPending ? (
					Array(7)
						.fill(4)
						.map((_, i) => (
							<div
								key={i}
								className=" h-20 w-20 flex-shrink-0 relative rounded-box overflow-hidden"
							>
								<Skeleton
									containerClassName="absolute top-0 left-0 w-full h-full"
									className="h-full w-full"
								/>
							</div>
						))
				) : images && images.length > 0 ? (
					images.map((img, i) => (
						<div
							key={`${img}-${i}`}
							onClick={() => setMainImg(img)}
							className="cursor-pointer h-20 w-20 flex-shrink-0 relative rounded-box overflow-hidden"
						>
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${img}`}
								fill
								alt="room title"
								className="object-cover"
							/>
						</div>
					))
				) : (
					<Empty message={"No image"} />
				)}
			</div>
		</div>
	);
}

export default ApartmentImages;
