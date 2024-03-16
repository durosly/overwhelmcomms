import connectMongo from "@/lib/connectDB";
import PodcastModel from "@/models/podcast";
import { NextResponse } from "next/server";

async function getPodcasts(request) {
	try {
		await connectMongo();

		const { searchParams } = new URL(request.url);

		const page = searchParams.get("page");
		const category = searchParams.get("category");
		const title = searchParams.get("title");

		const query = {};

		if (title !== null && title !== "") {
			query.$text = { $search: `\"${title}\"` };
		}

		if (category !== null && category !== "" && category !== "all") {
			query["category"] = category;
		}

		const podcasts = await PodcastModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});
		return NextResponse.json({
			status: true,
			message: "success",
			podcasts,
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ status: false, message: error.message },
			{ status: 500 }
		);
	}
}

export default getPodcasts;
