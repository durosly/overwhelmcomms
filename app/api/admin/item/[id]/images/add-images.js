import connectMongo from "@/lib/connectDB";
import ItemModel, { ItemUpdateImagessValidationSchema } from "@/models/item";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function addPropertyImages(request, { params: { id } }) {
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

		const apartment = await ItemModel.findByIdAndUpdate(id, {
			$push: { images: { $each: valid.data.images } },
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
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addPropertyImages;
