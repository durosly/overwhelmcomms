import connectMongo from "@/lib/connectDB";
import ItemModel, { ItemCreateValidationSchema } from "@/models/item";
import { NextResponse } from "next/server";

async function addItem(request) {
	try {
		await connectMongo();
		const body = await request.json();

		const valid = ItemCreateValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		await ItemModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "Success",
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addItem;
