import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

async function updateAuth(request) {
	try {
		await connectMongo();

		const { email, password } = await request.json();

		if (!email) {
			return NextResponse.json(
				{ status: false, message: "Email cannot be empty" },
				{ status: 400 }
			);
		}
		if (!password) {
			return NextResponse.json(
				{ status: false, message: "Password cannot be empty" },
				{ status: 400 }
			);
		}

		const users = await UserModel.find({}).limit(1);
		const user = users[0];

		console.log(user);

		user.email = email;
		user.password = password;

		await user.save();

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default updateAuth;
