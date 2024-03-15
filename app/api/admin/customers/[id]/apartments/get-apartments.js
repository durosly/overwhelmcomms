import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import TenantModel from "@/models/tenant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function getPropertyOfTenant(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const tenants = await TenantModel.find({
			customerId: id,
		});

		const data = [];

		for (const tenant of tenants) {
			const apartment = await ApartmentModel.findById(tenant.apartmentId);

			data.push({
				_id: tenant._id,
				apartmentName: apartment.title,
				apartmentId: apartment._id,
			});
		}

		return NextResponse.json({
			status: true,
			message: "success",
			tenants: data,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getPropertyOfTenant;
