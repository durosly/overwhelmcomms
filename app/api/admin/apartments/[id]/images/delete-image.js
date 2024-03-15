import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connectDB";
import ApartmentModel, {
	ApartmentUpdateImagessValidationSchema,
} from "@/models/apartment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function removePropertyImage(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		const valid = ApartmentUpdateImagessValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.findByIdAndUpdate(id, {
			$pull: { images: { $in: valid.data.images } },
		});

		valid.data.images.map((img) => {
			cloudinary.uploader.destroy(img);
		});

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			apartment,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default removePropertyImage;
