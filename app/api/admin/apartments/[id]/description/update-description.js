import connectMongo from "@/lib/connectDB";
import ApartmentModel, {
	ApartmentUpdateDescriptionValidationSchema,
} from "@/models/apartment";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function updatePropertyDescription(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		const valid =
			ApartmentUpdateDescriptionValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		const apartment = await ApartmentModel.findByIdAndUpdate(
			id,
			valid.data
		);

		if (!apartment) {
			return NextResponse.json(
				{ status: false, message: "No apartment found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			apartment,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default updatePropertyDescription;
