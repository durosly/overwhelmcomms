import connectMongo from "@/lib/connectDB";
import ItemModel, { ItemUpdateStatusValidationSchema } from "@/models/item";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function updateItemStatus(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		const valid = ItemUpdateStatusValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const item = await ItemModel.findByIdAndUpdate(id, valid.data);

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

export default updateItemStatus;
