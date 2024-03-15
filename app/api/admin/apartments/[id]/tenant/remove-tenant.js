import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import CustomerModel from "@/models/customer";
import TenantModel from "@/models/tenant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function removeTenantFromProperty(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.findById(id);

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		const { tenantId } = await request.json();

		if (!mongoose.Types.ObjectId.isValid(tenantId)) {
			return NextResponse.json(
				{ status: false, message: "Invalid Customer ID" },
				{ status: 400 }
			);
		}

		const tenant = await TenantModel.findByIdAndDelete(tenantId);

		if (!tenant) {
			return NextResponse.json(
				{ status: false, message: "No customer found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			tenant,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default removeTenantFromProperty;
