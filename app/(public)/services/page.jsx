import FadeAnimation from "@/components/fade-animation";
import serviceImg from "@/public/images/service.jpg";
import Image from "next/image";
import {
	FiBatteryCharging,
	FiCoffee,
	FiMap,
	FiPhoneCall,
	FiSettings,
	FiWifi,
} from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { FiMic } from "react-icons/fi";
import { FiBook } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";

export const metadata = { title: "Find out what else we can do for you" };

function ServicesPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Services</h2>
			<p className="mb-20">
				We are a company that offers a diverse range of services such as
				events planning, educational and social events, communications
				consulting, online broadcast (podcast), product marketing and
				management, online merchandising, and general consulting can be
				described as a full-service or integrated marketing and events
				firm. Alternatively, it could be referred to as a multifaceted
				or comprehensive consulting company. The specific term used may
				depend on the primary focus or specialization of the company.
				Explore the services that set us apart:
			</p>

			<div className="md:flex gap-10 mb-20">
				<div className="flex-1 relative w-full bg-slate-300 md:w-96 h-52 md:h-auto aspect-square rounded-2xl overflow-hidden">
					<Image
						src={serviceImg}
						alt=""
						fill
						className="object-cover"
					/>
				</div>
				<FadeAnimation
					right
					cascade
					ssrReveal
				>
					<div className="flex-1 space-y-4 mt-5 md:mt-0">
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiCalendar className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Events Planning and Management
								</h2>
							</div>
							<p className="pl-10">
								Let us transform your vision into reality with
								our expert event planning and management
								services. From concept creation to flawless
								execution, we handle every detail to ensure your
								event is a memorable success.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiBook className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Educational and Social Events Coordination
								</h2>
							</div>
							<p className="pl-10">
								Elevate your educational and social events with
								our professional coordination services. Whether
								it's a conference, seminar, or networking event,
								we specialize in creating engaging and impactful
								experiences for all attendees.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiWifi className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Communications Consulting
								</h2>
							</div>
							<p className="pl-10">
								Unlock the power of effective communication with
								our strategic consulting services. We'll help
								you craft compelling messages, build strong
								relationships, and navigate any communication
								challenges to ensure your voice is heard loud
								and clear.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiMic className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Online Broadcast (Podcast) Production
								</h2>
							</div>
							<p className="pl-10">
								Engage your audience like never before with our
								expert podcast production services. From content
								development to distribution strategy, we'll help
								you create captivating audio content that
								resonates with your target audience.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiPackage className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Product Marketing and Management
								</h2>
							</div>
							<p className="pl-10">
								Drive your product's success with our tailored
								marketing and management solutions. We'll
								develop comprehensive strategies to launch,
								promote, and manage your products effectively,
								ensuring maximum exposure and profitability.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiTrendingUp className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Online Merchandising Strategies
								</h2>
							</div>
							<p className="pl-10">
								Amplify your online presence and boost sales
								with our innovative merchandising strategies.
								From e-commerce optimization to compelling
								product displays, we'll help you showcase your
								offerings in the best possible light.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiBriefcase className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									General Consulting Services
								</h2>
							</div>
							<p className="pl-10">
								Partner with us for all your consulting needs
								and gain access to expert advice and guidance
								across various business areas. Whether you need
								strategic planning, market analysis, or
								operational support, we're here to help you
								achieve your goals.
							</p>
						</div>
					</div>
				</FadeAnimation>
			</div>
			<FadeAnimation bottom>
				<p className="mb-20">
					At Overwhelmcomms Solutions, our comprehensive suite of
					services is designed to offer you seamless event planning,
					effective communications consulting, and dynamic online
					broadcast solutions. We understand the importance of
					creating memorable experiences and providing strategic
					guidance to ensure the success of your events and marketing
					initiatives. Let us handle the details while you focus on
					what matters most - engaging with your audience and
					achieving your business goals. Experience the Overwhelmcomms
					Solutions advantage today.
				</p>
			</FadeAnimation>
		</>
	);
}

export default ServicesPage;
