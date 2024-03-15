import connectMongo from "@/lib/connectDB";
import EnquiryModel from "@/models/enquire";
import { NextResponse } from "next/server";

async function getEnquiries(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		const query = {};

		const enquiries = await EnquiryModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			data: enquiries,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getEnquiries;
