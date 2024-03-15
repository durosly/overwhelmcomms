import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connectDB";
import ApartmentModel, {
	ApartmentUpdateVideoValidationSchema,
} from "@/models/apartment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function addPropertyVideo(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		const valid = ApartmentUpdateVideoValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
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
			cloudinary.uploader.destroy(existingVideo);
		}

		apartment.video = valid.data.video;

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

export default addPropertyVideo;
