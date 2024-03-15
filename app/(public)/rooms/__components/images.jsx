"use client";
import Image from "next/image";

function ImageSliderContainer({ img }) {
	return (
		<>
			<div className="relative w-full h-80 z-10">
				<Image
					src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${img}`}
					fill
					className="object-cover"
					alt="title"
				/>
			</div>
		</>
	);
}

export default ImageSliderContainer;
