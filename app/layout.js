import { Roboto } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "./(public)/components/client-wrapper";
import keywordsList from "@/app/keywords.json";
import { metaInfo } from "./meta";
import NextTransitionBar from "next-transition-bar";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["100", "300", "400", "500", "700", "900"],
	variable: "--font-roboto",
});

export const viewport = {
	themeColor: "#1F4774",
};

export const metadata = {
	title: {
		default: "Find a new home", // a default is required when creating a template
		template: "%s | Benchmark realty management",
	},
	category: "realestate",
	keywords: [...keywordsList.keywords],
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
	openGraph: {
		title: metaInfo.title,
		description: metaInfo.description,

		url: process.env.NEXT_PUBLIC_URL,
		siteName: "Benchmark realty managment",
		images: [
			{
				url: `/images/og-main.png`,
				width: 800,
				height: 600,
			},
			{
				url: "/images/og-alt.png",
				width: 1800,
				height: 1600,
				alt: metaInfo.title,
			},
		],
		twitter: {
			card: "summary_large_image",
			title: metaInfo.title,
			description: metaInfo.description,
			creator: "@durosly_",
			images: [`/images/og-main.png`],
		},
		locale: "en_US",
		type: "website",
	},
	description: metaInfo.description,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.variable}`}>
				<NextTransitionBar color="#1F4774" />
				<ClientWrapper>{children}</ClientWrapper>
				<Toaster />
			</body>
		</html>
	);
}
