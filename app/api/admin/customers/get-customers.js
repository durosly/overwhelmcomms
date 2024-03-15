import connectMongo from "@/lib/connectDB";
import CustomerModel from "@/models/customer";
import { NextResponse } from "next/server";

async function getCustomers(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		const q = searchParams.get("q");

		const query = {};

		if (!!q) {
			query.$text = { $search: `\"${q}\"` };
		}

		const customers = await CustomerModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			data: customers,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getCustomers;
