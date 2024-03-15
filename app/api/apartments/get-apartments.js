import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import { NextResponse } from "next/server";

async function getApartments(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);

		const page = searchParams.get("page");
		const location = searchParams.get("location");
		const price = searchParams.get("price");
		const beds = searchParams.get("beds");

		const query = { status: { $ne: "hidden" } };

		if (location !== null && location !== "") {
			query["location"] = { $regex: location, $options: "i" };
		}

		if (beds !== null && beds !== "") {
			if (Number(beds)) {
				query["beds"] = Number(beds);
			}
		}

		if (price !== null && price !== "" && price !== "all") {
			const prices = price
				.split("-")
				.map((p) => (p === "" ? 0 : parseInt(p)));

			query["price"] = {
				$gte: Math.min(...prices),
				$lte: Math.max(...prices),
			};
		}

		// TODO: add status not hidden

		const apartments = await ApartmentModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			apartments,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getApartments;
