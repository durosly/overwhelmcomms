import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function removePropertyVideo(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.findById(id);

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		const existingVideo = apartment.video;

		if (existingVideo) {
			await cloudinary.uploader.destroy(existingVideo, {
				resource_type: "video",
			});
		}

		apartment.video = "";

		await apartment.save();

		return NextResponse.json({
			status: true,
			message: "success",
			apartment,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default removePropertyVideo;
