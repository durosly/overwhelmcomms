import connectMongo from "@/lib/connectDB";
import MessageModel from "@/models/message";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

async function deleteMessage(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const message = await MessageModel.findByIdAndDelete(id);

		return NextResponse.json({
			status: true,
			message: "success",
			data: message,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default deleteMessage;
