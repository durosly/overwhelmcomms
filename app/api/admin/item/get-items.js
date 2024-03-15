import connectMongo from "@/lib/connectDB";
import ItemModel from "@/models/item";
import { NextResponse } from "next/server";

async function getItems(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		const q = searchParams.get("q");

		const query = {};

		if (!!q) {
			query.$text = { $search: `\"${q}\"` };
		}

		const items = await ItemModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			data: items,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getItems;
