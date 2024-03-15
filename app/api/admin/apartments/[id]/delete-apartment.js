import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import TenantModel from "@/models/tenant";
import cloudinary from "@/lib/cloudinary";
import EnquiryModel from "@/models/enquire";

async function deleteApartment(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.findByIdAndDelete(id);

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		await TenantModel.deleteMany({ apartmentId: id });
		await EnquiryModel.deleteMany({ apartmentId: id });

		apartment.images.map((img) => {
			cloudinary.uploader.destroy(img);
		});

		const existingVideo = apartment.video;

		if (existingVideo) {
			await cloudinary.uploader.destroy(existingVideo, {
				resource_type: "video",
			});
		}

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

export default deleteApartment;
