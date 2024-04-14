import FadeAnimation from "@/components/fade-animation";
import serviceImg from "@/public/images/service.jpg";
import Image from "next/image";
import Link from "next/link";
import {
	FiBook,
	FiBriefcase,
	FiCalendar,
	FiMic,
	FiPackage,
	FiTrendingUp,
	FiWifi,
} from "react-icons/fi";

function AmazonKDB() {
	return (
		<>
			<div className="mt-10 mb-10">
				<h2 className="text-xl ">
					Unlock Your Amazon KDP Success with Our Premium Service
				</h2>
				<h1 className="text-4xl font-bold mb-5">Amazon KDP services</h1>
				<p className="">
					Are you ready to elevate your publishing journey on Amazon
					Kindle Direct Publishing (KDP)? Look no further! Our premium
					KDP service is tailored to empower authors, like you, to
					soar to new heights in the digital publishing landscape.
				</p>
			</div>

			<div>
				<h2 className="text-xl mb-5">
					Why Choose Our Amazon KDP Service?
				</h2>
				<div className="flex-1 space-y-4 mt-5 md:mt-0">
					<div>
						<div className="flex gap-2 items-center mb-2">
							<div className="w-8  rounded-md aspect-square flex justify-center items-center">
								<FiCalendar className="w-4 h-4 stroke-primary" />
							</div>
							<h2 className="text-xl font-semibold text-left">
								Expert Guidance
							</h2>
						</div>
						<p className="pl-10">
							Navigate the complexities of Amazon KDP with
							confidence. Our seasoned professionals provide
							personalized guidance every step of the way,
							ensuring your publishing experience is seamless and
							stress-free.
						</p>
					</div>
					<div>
						<div className="flex gap-2 items-center mb-2">
							<div className="w-8  rounded-md aspect-square flex justify-center items-center">
								<FiBook className="w-4 h-4 stroke-primary" />
							</div>
							<h2 className="text-xl font-semibold text-left">
								Optimized Listings
							</h2>
						</div>
						<p className="pl-10">
							Stand out in the crowded marketplace with
							meticulously crafted book listings. We optimize your
							product pages to maximize visibility, engagement,
							and ultimately, sales.
						</p>
					</div>
					<div>
						<div className="flex gap-2 items-center mb-2">
							<div className="w-8  rounded-md aspect-square flex justify-center items-center">
								<FiWifi className="w-4 h-4 stroke-primary" />
							</div>
							<h2 className="text-xl font-semibold text-left">
								Strategic Marketing
							</h2>
						</div>
						<p className="pl-10">
							Gain a competitive edge with our strategic marketing
							strategies. From keyword optimization to targeted
							advertising campaigns, we help amplify your
							book&apos;s reach and drive traffic to your
							listings.
						</p>
					</div>
					<div>
						<div className="flex gap-2 items-center mb-2">
							<div className="w-8  rounded-md aspect-square flex justify-center items-center">
								<FiMic className="w-4 h-4 stroke-primary" />
							</div>
							<h2 className="text-xl font-semibold text-left">
								Continuous Support
							</h2>
						</div>
						<p className="pl-10">
							Your success is our priority. Our dedicated support
							team is always available to address your concerns,
							answer your questions, and provide ongoing
							assistance throughout your publishing journey.
						</p>
					</div>
					<div>
						<div className="flex gap-2 items-center mb-2">
							<div className="w-8  rounded-md aspect-square flex justify-center items-center">
								<FiPackage className="w-4 h-4 stroke-primary" />
							</div>
							<h2 className="text-xl font-semibold text-left">
								Data-Driven Insights
							</h2>
						</div>
						<p className="pl-10">
							Make informed decisions with actionable insights. We
							provide comprehensive analytics and reports to help
							you understand your audience, track performance, and
							optimize your strategy for success.
						</p>
					</div>
				</div>
			</div>

			<div className="text-center my-10">
				<Link
					className="btn btn-primary"
					href="/contact"
				>
					Contact us now
				</Link>
			</div>
		</>
	);
}

export default AmazonKDB;
