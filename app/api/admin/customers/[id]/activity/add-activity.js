import connectMongo from "@/lib/connectDB";
import CustomerActivityModel, {
	CustomerActivityValidationSchema,
} from "@/models/activity";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function addActivityToCustomer(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const { summary } = await request.json();

		const data = {
			summary,
			userId: id,
		};

		const valid = CustomerActivityValidationSchema.safeParse(data);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const customerActivity = await CustomerActivityModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "success",
			activity: customerActivity,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addActivityToCustomer;
