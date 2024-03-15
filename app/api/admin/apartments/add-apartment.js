import connectMongo from "@/lib/connectDB";
import ApartmentModel, { ApartmentValidationSchema } from "@/models/apartment";
import { NextResponse } from "next/server";

async function addApartment(request) {
	try {
		await connectMongo();
		const body = await request.json();

		const valid = ApartmentValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "Success",
			apartment,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addApartment;
