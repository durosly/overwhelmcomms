import connectMongo from "@/lib/connectDB";
import CustomerModel from "@/models/customer";
import { NextResponse } from "next/server";

async function getCustomerNumber() {
	try {
		await connectMongo();

		const customers = await CustomerModel.find({});
		return NextResponse.json({
			status: true,
			message: "success",
			count: customers.length,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getCustomerNumber;
