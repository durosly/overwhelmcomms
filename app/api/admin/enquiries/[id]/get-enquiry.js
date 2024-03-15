import connectMongo from "@/lib/connectDB";
import EnquiryModel from "@/models/enquire";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function getEnquiry(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const enquiry = await EnquiryModel.findById(id);

		if (!enquiry) {
			return NextResponse.json(
				{ status: false, message: "No customer account found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			enquiry,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getEnquiry;
