import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";

const customerActivitySchema = new mongoose.Schema({
	userId: String,
	summary: String,
	createdAt: { type: Date, default: Date.now },
});

customerActivitySchema.plugin(paginate);

const CustomerActivityValidationSchema = z.object({
	summary: z
		.string()
		.min(3, { message: "Summary must be atleast 3 chars long" })
		.max(500, { message: "Summary should be less than 500 chars long" }),

	userId: z.custom((id) => {
		return mongoose.Types.ObjectId.isValid(id);
	}),
});

export { CustomerActivityValidationSchema };

const CustomerActivityModel =
	mongoose.models.CustomerActivity ||
	mongoose.model("CustomerActivity", customerActivitySchema);

export default CustomerActivityModel;
