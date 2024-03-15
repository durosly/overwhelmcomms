import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import CustomerModel from "@/models/customer";
import TenantModel from "@/models/tenant";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function addTenantToProperty(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const { customerId } = await request.json();

		if (!mongoose.Types.ObjectId.isValid(customerId)) {
			return NextResponse.json(
				{ status: false, message: "Invalid Customer ID" },
				{ status: 400 }
			);
		}

		const customer = await CustomerModel.findById(customerId);

		if (!customer) {
			return NextResponse.json(
				{ status: false, message: "No customer found" },
				{ status: 404 }
			);
		}

		const apartment = await ApartmentModel.findById(id);

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		const exist = await TenantModel.findOne({
			apartmentId: id,
			customerId,
		});

		if (exist) {
			return NextResponse.json(
				{ status: false, message: "Customer already added" },
				{ status: 409 }
			);
		}

		const tenant = await TenantModel.create({
			apartmentId: id,
			customerId,
			customerName: customer.name,
		});

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

export default addTenantToProperty;
