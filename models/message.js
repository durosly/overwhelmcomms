import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { z } from "zod";
import { phone } from "phone";

const messageSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	message: String,
	subject: String,
	createdAt: { type: Date, default: Date.now },
});

messageSchema.plugin(paginate);

const MessageValidationSchema = z.object({
	name: z.string({ message: "Name cannot be empty" }),
	subject: z
		.string({ message: "Name cannot be empty" })
		.min(3, { message: "Subject must be atleast 3 chars long" })
		.max(200, { message: "Message should be lesser than 200 chars" }),
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

export { MessageValidationSchema };

const MessageModel =
	mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;
