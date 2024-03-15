import connectMongo from "@/lib/connectDB";
import TenantModel from "@/models/tenant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function getTenantOfProperty(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const tenants = await TenantModel.find({
			apartmentId: id,
		});

		return NextResponse.json({
			status: true,
			message: "success",
			tenants,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getTenantOfProperty;
