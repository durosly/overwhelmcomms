import connectMongo from "@/lib/connectDB";
import ItemModel from "@/models/item";
import { NextResponse } from "next/server";

async function getItemNumber() {
	try {
		await connectMongo();

		const items = await ItemModel.find({});
		return NextResponse.json({
			status: true,
			message: "success",
			count: items.length,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getItemNumber;
