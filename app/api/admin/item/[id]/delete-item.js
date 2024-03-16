import cloudinary from "@/lib/cloudinary";
import connectMongo from "@/lib/connectDB";
import ItemModel from "@/models/item";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function deleteItem(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const item = await ItemModel.findByIdAndDelete(id);

		if (!item) {
			return NextResponse.json(
				{ status: false, message: "No item found" },
				{ status: 404 }
			);
		}

		item.images.map((img) => {
			cloudinary.uploader.destroy(img);
		});

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default deleteItem;
