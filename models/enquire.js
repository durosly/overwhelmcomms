import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";
import { phone } from "phone";

const enquireSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	message: String,
	apartmentId: String,
	apartmentTitle: String,
	createdAt: { type: Date, default: Date.now },
});

enquireSchema.plugin(paginate);

const EnquiryValidationSchema = z.object({
	name: z.string({ message: "Name cannot be empty" }),
	phone: z
		.custom(
			(number) => {
				const res = phone(number, { country: "NG" });
				return res.isValid;
			},
			{ message: "Enter a valid phonenumber" }
		)
		.transform((number) => {
			const res = phone(number, { country: "NG" });
			return res.phoneNumber;
		}),
	email: z
		.string({ message: "Name cannot be empty" })
		.email({ message: "Enter a valid email address" })
		.optional(),
	message: z
		.string()
		.min(3, { message: "Message must be atleast 3 chars long" })
		.max(1000, { message: "Message should be less than 1000 chars long" }),
});

export { EnquiryValidationSchema };

const EnquiryModel =
	mongoose.models.Enquiry || mongoose.model("Enquiry", enquireSchema);

export default EnquiryModel;
