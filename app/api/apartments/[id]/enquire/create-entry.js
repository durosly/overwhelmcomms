import connectMongo from "@/lib/connectDB";
import ApartmentModel from "@/models/apartment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import EnquiryModel, { EnquiryValidationSchema } from "@/models/enquire";

async function createApartmentEnquiry(request, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const body = await request.json();

		let entry = {};

		if (body.email === "") {
			for (const val in body) {
				if (val !== "email") {
					entry[val] = body[val];
				}
			}
		} else {
			entry = body;
		}

		const valid = EnquiryValidationSchema.safeParse(entry);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
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

		const enquiry = await EnquiryModel.create({
			...valid.data,
			apartmentId: id,
			apartmentTitle: apartment.title,
		});

		return NextResponse.json({
			status: true,
			message: "success",
			enquiry,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default createApartmentEnquiry;
