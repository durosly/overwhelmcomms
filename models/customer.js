import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";
import { phone } from "phone";

const customerSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	type: {
		type: String,
		enum: ["enquiry", "retal", "purchase"],
		default: "enquiry",
	},
	createdAt: { type: Date, default: Date.now },
});

customerSchema.plugin(paginate);
customerSchema.index({ name: "text", email: "text", phone: "text" });
// customerSchema.index({ name: "text" });
// customerSchema.index({ email: "text" });
// customerSchema.index({ phone: "text" });

const CustomerValidationSchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	phone: z
		.custom((number) => {
			const res = phone(number, { country: "NG" });
			return res.isValid;
		})
		.transform((number) => {
			const res = phone(number, { country: "NG" });
			return res.phoneNumber;
		}),
});

export { CustomerValidationSchema };

const CustomerModel =
	mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default CustomerModel;
