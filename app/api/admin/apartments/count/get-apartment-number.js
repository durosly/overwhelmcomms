import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import { NextResponse } from "next/server";

async function getApartmentNumber() {
	try {
		await connectMongo();

		const apartments = await ApartmentModel.find({});
		return NextResponse.json({
			status: true,
			message: "success",
			count: apartments.length,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getApartmentNumber;
