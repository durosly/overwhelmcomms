import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";

const itemSchema = new mongoose.Schema(
	{
		title: String,
		category: String,
		desc: String,
		link: String,
		features: [String],
		images: [String],
		status: {
			type: String,
			enum: ["available", "unavailable", "hidden"],
			default: "hidden",
		},
	},
	{ timestamps: true }
);

itemSchema.plugin(paginate);
itemSchema.index({
	title: "text",
	category: "text",
	desc: "text",
});

const ItemCreateValidationSchema = z.object({
	title: z.string().min(3),
	category: z.string().min(3),
	desc: z.string().min(3),
	link: z.string().url(),
});

const ItemUpdateTitleValidationSchema = z.object({
	title: z.string().min(3),
});
const ItemUpdateFeaturesValidationSchema = z.object({
	features: z
		.array(z.string())
		.nonempty({ message: "Features cannot be empty" }),
});
const ItemUpdateImagessValidationSchema = z.object({
	images: z.array(z.string()).nonempty({ message: "Images cannot be empty" }),
});

const ItemUpdateStatusValidationSchema = z.object({
	status: z.enum(["available", "unavailable", "hidden"], {
		message: "Invalid status option",
	}),
});
const ItemUpdateDescriptionValidationSchema = z.object({
	desc: z
		.string({
			message: "Description cannot be empty",
		})
		.min(300, { message: "Description is too short. min 300 chars" }),
});

// const ItemValidationSchema = ApartmentUpdateInfoValidationSchema.merge(
// 	ApartmentUpdateTitleValidationSchema
// ).merge(ApartmentUpdateTypeValidationSchema);

export {
	ItemCreateValidationSchema,
	ItemUpdateStatusValidationSchema,
	ItemUpdateFeaturesValidationSchema,
	ItemUpdateImagessValidationSchema,
};

const ItemModel = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default ItemModel;
