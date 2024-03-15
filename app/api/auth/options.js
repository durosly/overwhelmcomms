import connectMongo from "@/lib/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { strigifyObj } from "@/lib/utils";
import UserModel from "@/models/user";

export const authOptions = {
	session: {
		maxAge: 1 * 24 * 60 * 60, // 24 hours
	},

	providers: [
		CredentialsProvider({
			name: "Credentials",

			async authorize(credentials) {
				await connectMongo();
				const { email, password } = credentials;

				const user = await UserModel.findOne({
					email,
				});
				if (user) {
					const valid = bcrypt.compareSync(
						password || "",
						user.password
					);

					if (!valid) {
						throw new Error("Invalid credentials");
					}

					const userObj = strigifyObj(user);
					return {
						id: userObj._id,
						name: `${userObj.firstname} ${userObj.lastname}`,
						email: userObj.email,
					};
				} else {
					throw new Error("Invalid credentials");
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session?.user) {
				session.user.userId = token.userId;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.userId = user.userId;
			}
			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
};
