import connectMongo from "@/lib/connectDB";
import CustomerActivityModel from "@/models/activity";
import CustomerModel from "@/models/customer";
import TenantModel from "@/models/tenant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function deleteCustomer(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const customer = await CustomerModel.findByIdAndDelete(id);
		await CustomerActivityModel.deleteMany({ userId: id });
		await TenantModel.deleteMany({ customerId: id });

		if (!customer) {
			return NextResponse.json(
				{ status: false, message: "No customer account found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			customer,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default deleteCustomer;
