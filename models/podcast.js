import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";

const podcastSchema = new mongoose.Schema(
	{
		title: String,
		category: String,
		desc: String,
		link: String,
	},
	{ timestamps: true }
);

podcastSchema.plugin(paginate);
podcastSchema.index({
	title: "text",
	category: "text",
	desc: "text",
});

const PodcastCreateValidationSchema = z.object({
	title: z.string().min(3),
	category: z.string().min(3),
	desc: z.string().min(3),
	link: z.string().url(),
});

const PodcastUpdateTitleValidationSchema = z.object({
	title: z.string().min(3),
});
const PodcastUpdateFeaturesValidationSchema = z.object({
	features: z
		.array(z.string())
		.nonempty({ message: "Features cannot be empty" }),
});
const PodcastUpdateImagessValidationSchema = z.object({
	images: z.array(z.string()).nonempty({ message: "Images cannot be empty" }),
});

const PodcastUpdateStatusValidationSchema = z.object({
	status: z.enum(["available", "unavailable", "hidden"], {
		message: "Invalid status option",
	}),
});
const PodcastUpdateDescriptionValidationSchema = z.object({
	desc: z
		.string({
			message: "Description cannot be empty",
		})
		.min(300, { message: "Description is too short. min 300 chars" }),
});

// const PodcastValidationSchema = ApartmentUpdateInfoValidationSchema.merge(
// 	ApartmentUpdateTitleValidationSchema
// ).merge(ApartmentUpdateTypeValidationSchema);

export {
	PodcastCreateValidationSchema,
	PodcastUpdateStatusValidationSchema,
	PodcastUpdateFeaturesValidationSchema,
	PodcastUpdateImagessValidationSchema,
};

const PodcastModel =
	mongoose.models.Podcast || mongoose.model("Podcast", podcastSchema);

export default PodcastModel;
