import connectMongo from "@/lib/connectDB";
import PodcastModel from "@/models/podcast";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function deletePodcast(_, { params: { id } }) {
	try {
		await connectMongo();

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid UUID" },
				{ status: 400 }
			);
		}

		const podcast = await PodcastModel.findByIdAndDelete(id);

		if (!podcast) {
			return NextResponse.json(
				{ status: false, message: "No podcast found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default deletePodcast;
