import connectMongo from "@/lib/connectDB";
import PodcastModel from "@/models/podcast";
import { NextResponse } from "next/server";

async function getPodcastNumber() {
	try {
		await connectMongo();

		const podcasts = await PodcastModel.find({});
		return NextResponse.json({
			status: true,
			message: "success",
			count: podcasts.length,
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getPodcastNumber;
