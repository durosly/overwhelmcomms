import connectMongo from "@/lib/connectDB";
import CustomerModel, { CustomerValidationSchema } from "@/models/customer";
import { NextResponse } from "next/server";

async function addCustomers(request) {
	try {
		await connectMongo();
		const body = await request.json();

		const valid = CustomerValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const customer = await CustomerModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "Success",
			customer,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addCustomers;
