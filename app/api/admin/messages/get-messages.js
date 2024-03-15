import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";
import { NextResponse } from "next/server";

async function getMessages(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		const query = {};

		const messages = await MessageModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			data: messages,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getMessages;
