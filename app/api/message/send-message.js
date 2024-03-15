import connectMongo from "@/lib/connectDB";
import MessageModel, { MessageValidationSchema } from "@/models/message";
import { NextResponse } from "next/server";

async function createMessage(request) {
	try {
		await connectMongo();

		const body = await request.json();

		let entry = {};

		if (body.email === "") {
			for (const val in body) {
				if (val !== "email") {
					entry[val] = body[val];
				}
			}
		} else {
			entry = body;
		}

		const valid = MessageValidationSchema.safeParse(entry);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const message = await MessageModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "success",
			message,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default createMessage;
