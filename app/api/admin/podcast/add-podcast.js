import connectMongo from "@/lib/connectDB";
import PodcastModel, { PodcastCreateValidationSchema } from "@/models/podcast";
import { NextResponse } from "next/server";

async function addPodcast(request) {
	try {
		await connectMongo();
		const body = await request.json();

		const valid = PodcastCreateValidationSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		await PodcastModel.create(valid.data);

		return NextResponse.json({
			status: true,
			message: "Success",
		});
	} catch (error) {
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default addPodcast;
