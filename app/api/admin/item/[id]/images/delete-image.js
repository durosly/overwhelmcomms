import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connectDB";
import ItemModel, { ItemUpdateImagessValidationSchema } from "@/models/item";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function removeItemImage(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		const valid = ItemUpdateImagessValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const item = await ItemModel.findByIdAndUpdate(id, {
			$pull: { images: { $in: valid.data.images } },
		});

		valid.data.images.map((img) => {
			cloudinary.uploader.destroy(img);
		});

		if (!item) {
			return NextResponse.json(
				{ status: false, message: "No item found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			item,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default removeItemImage;
