import connectMongo from "@/lib/connectDB";
import ItemModel from "@/models/item";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

async function getItem(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const item = await ItemModel.findById(id);

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
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getItem;
