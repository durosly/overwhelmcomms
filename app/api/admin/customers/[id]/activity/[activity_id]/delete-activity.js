import connectMongo from "@/lib/connectDB";
import CustomerActivityModel from "@/models/activity";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function deleteActivityOfCustomer(_, { params: { id, activity_id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		if (!mongoose.Types.ObjectId.isValid(activity_id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const customerActivities =
			await CustomerActivityModel.findByIdAndDelete(activity_id);

		return NextResponse.json({
			status: true,
			message: "success",
			activities: customerActivities,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default deleteActivityOfCustomer;
