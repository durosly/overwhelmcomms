import connectMongo from "@/lib/connectDB";
import ItemModel from "@/models/item";
import { NextResponse } from "next/server";

async function getItems(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);

		const page = searchParams.get("page");
		const category = searchParams.get("category");
		const title = searchParams.get("title");

		const query = { status: { $ne: "hidden" } };

		if (title !== null && title !== "") {
			query["title"] = { $regex: location, $options: "i" };
		}

		if (category !== null && category !== "") {
			query["category"] = category;
		}

		// if (price !== null && price !== "" && price !== "all") {
		// 	const prices = price
		// 		.split("-")
		// 		.map((p) => (p === "" ? 0 : parseInt(p)));

		// 	query["price"] = {
		// 		$gte: Math.min(...prices),
		// 		$lte: Math.max(...prices),
		// 	};
		// }

		const items = await ItemModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			items,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getItems;
