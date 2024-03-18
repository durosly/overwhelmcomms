import Image from "next/image";
import landmark from "@/public/images/landmark.jpg";
import { FiEye, FiCrosshair } from "react-icons/fi";
import Link from "next/link";
import FadeAnimation from "@/components/fade-animation";

export const metadata = { title: "Learn about us and what we do" };

function AboutUsPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">About Us</h2>
			<p className="mb-20">
				Overwhelm Communication International is a leading provider of
				event planning, communications consulting, and marketing
				services. Our experienced team is dedicated to delivering
				outstanding results and exceeding client expectations. We offer
				innovative solutions tailored to meet the unique needs of each
				client, leveraging the latest technologies and strategies to
				make every event and communication initiative a success. With a
				commitment to excellence and a focus on building strong client
				relationships, Overwhelm Communication International is your
				trusted partner for unforgettable experiences and achieving your
				business goals.
			</p>

			<div className="md:flex gap-10 mb-20">
				<FadeAnimation
					left
					ssrReveal
				>
					<div className="relative w-full md:w-96 h-52 md:h-auto aspect-square rounded-2xl overflow-hidden">
						<Image
							src={landmark}
							alt=""
							fill
							className="object-cover"
						/>
					</div>
				</FadeAnimation>
				<div className="flex-1 space-y-4 mt-5 md:mt-0">
					<div>
						<div className="flex gap-2 items-center mb-5">
							<FadeAnimation
								top
								ssrReveal
							>
								<div className="w-10 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiEye className="w-5 h-5 stroke-primary" />
								</div>
							</FadeAnimation>
							<FadeAnimation
								top
								delay={500}
								ssrReveal
							>
								<h2 className="text-3xl font-semibold text-left">
									Our Mission
								</h2>
							</FadeAnimation>
						</div>
						<FadeAnimation
							right
							ssrReveal
							delay={1000}
						>
							<p>
								At Overwhelm Communication International, we are
								committed to inspiring, redefining, and
								amplifying possibilities with one event, idea,
								and product at a time. Through our innovative
								solutions, creative vision, and unwavering
								dedication. We are committed to empowering our
								clients and communities to surpass limitations,
								achieve greatness, and shape a future filled
								with boundless opportunities
							</p>
						</FadeAnimation>
					</div>
					<div>
						<div className="flex gap-2 items-center mb-5">
							<FadeAnimation
								top
								ssrReveal
							>
								<div className="w-10 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiCrosshair className="w-5 h-5 stroke-primary" />
								</div>
							</FadeAnimation>
							<FadeAnimation
								top
								delay={500}
								ssrReveal
							>
								<h2 className="text-3xl font-semibold text-left">
									Brand Objectives
								</h2>
							</FadeAnimation>
						</div>
						<FadeAnimation
							right
							delay={1000}
							ssrReveal
						>
							<p>
								To inspire individuals and organizations to
								reach new heights, redefine standards, and
								amplify possibilities, igniting a world of
								endless potential and innovation.
							</p>
						</FadeAnimation>
					</div>
				</div>
			</div>

			<div className="mb-20">
				<FadeAnimation left>
					<h2 className="text-4xl font-bold  mb-5 ">
						Why choose us?
					</h2>
				</FadeAnimation>
				<FadeAnimation
					bottom
					delay={500}
				>
					<p className="mb-10 ">
						Overwhelm Communication International is where
						excellence meets innovation. As you navigate through the
						myriad of options for event planning, communications
						consulting, and marketing services, allow us to present
						why choosing us is your best decision. With a commitment
						to exceeding expectations, a penchant for creativity,
						and a dedication to seamless execution, we stand out as
						your premier partner for all your event and
						communication needs.
					</p>
				</FadeAnimation>
				<div className="flex flex-wrap gap-10 mb-20">
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Expertise Across Diverse Industries
							</h3>
							<p>
								Our team brings a wealth of experience and
								expertise across various industries, ensuring
								that we understand your unique needs and can
								tailor our services to meet your specific
								requirements.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Exceptional Customer Service
							</h3>
							<p>
								At Overwhelm Communication International, your
								satisfaction is our top priority. We go above
								and beyond to provide exceptional customer
								service, ensuring that every interaction with us
								is smooth, efficient, and enjoyable.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Attention to Detail
							</h3>
							<p>
								From the initial planning stages to the final
								execution, we pay meticulous attention to detail
								to ensure that every aspect of your event or
								communication campaign is flawless and exceeds
								your expectations.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Strategic Approach
							</h3>
							<p>
								We take a strategic approach to every project,
								leveraging our industry knowledge and insights
								to develop comprehensive plans that drive
								results and align with your overall business
								objectives.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Flexibility and Adaptability
							</h3>
							<p>
								We understand that plans can change, and
								we&apos;re always ready to adapt and pivot to
								ensure that your event or communication
								initiative remains on track and achieves its
								goals, no matter what challenges arise.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Proven Track Record of Success
							</h3>
							<p>
								With a long history of successful events and
								communication campaigns under our belt, you can
								trust that Eventful Solutions has the experience
								and expertise to deliver results that exceed
								your expectations time and time again.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Affordability
							</h3>
							<p>
								We offer a range of accommodation options to fit
								various budgets, ensuring that you can find a
								home that suits your financial needs without
								compromising on quality.
							</p>
						</div>
					</FadeAnimation>
				</div>
				<FadeAnimation left>
					<p>
						Consider Overwhelm Communication International as your
						trusted partner. With our expertise, dedication to
						excellence, and proven track record of success, we are
						confident that choosing us means choosing unparalleled
						quality and service. Let us bring your vision to life
						and elevate your events and communication initiatives to
						new heights. Experience the Overwhelm Communication
						International difference today.
					</p>
				</FadeAnimation>
			</div>

			<div className="text-center mb-20 ">
				<FadeAnimation top>
					<p className="inline-block text-4xl font-bold mb-5 relative">
						We can&apos;t wait to here from you
						<FadeAnimation
							left
							delay={1000}
						>
							<span className="inline-block absolute -bottom-10 -left-5 md:left-[10%]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="59.1162"
									height="45.35772"
									viewBox="0 0 59.1162 45.35772"
									creator="Katerina Limpitsouni"
								>
									<path
										d="M41.69158,14.65737c3.02152-4.51246,6.04304-9.02491,9.06455-13.53737h-1.29521c2.40533,3.96877,4.81066,7.93755,7.216,11.90632,.34353,.56682,.68706,1.13365,1.03059,1.70047,.49968,.82446,1.79734,.07144,1.29521-.75708-2.40533-3.96877-4.81066-7.93755-7.216-11.90632-.34353-.56682-.68706-1.13365-1.03059-1.70047-.3042-.50192-.98348-.46555-1.29521,0-3.02152,4.51246-6.04304,9.02491-9.06455,13.53737-.53858,.80434,.76019,1.55609,1.29521,.75708h0Z"
										fill="#01010C"
										origin="undraw"
									/>
									<path
										d="M.71568,45.06023c9.37198-1.04012,18.03249-6.72685,22.51593-15.06658,2.28371-4.24797,3.7883-9.90346,1.05639-14.31396-2.29329-3.70239-7.18429-5.68536-10.98375-2.94419-3.95978,2.85684-4.40562,8.09368-3.36503,12.48745,.63378,2.67602,1.65266,5.29118,2.6765,7.83978,.87047,2.16683,1.84546,4.3184,3.17656,6.24615,2.6185,3.79221,6.56207,6.27436,11.28073,6.03263,4.95423-.25379,9.33462-3.00957,12.42751-6.77246,3.77097-4.58787,6.06946-10.3746,7.90237-15.96445,2.07519-6.32874,3.32934-12.90027,3.82732-19.53899,.07223-.96288-1.42812-.95825-1.5,0-.74496,9.93139-3.20394,20.04629-7.77523,28.93617-2.07757,4.04029-4.87685,7.93778-8.96377,10.12785-3.86989,2.07377-8.72806,2.49879-12.47997-.0623-3.46799-2.36728-5.32423-6.47642-6.78884-10.26631-1.63486-4.23046-3.81938-9.23633-2.34844-13.80326,.63763-1.9797,2.00611-3.92282,3.99719-4.71236,2.07019-.82091,4.32818-.15697,5.97527,1.24272,3.89475,3.30976,3.27051,8.88073,1.38336,13.10231-3.88123,8.6824-12.59401,14.88436-22.01409,15.92982-.94888,.10531-.95959,1.6065,0,1.5H.71568Z"
										fill="#01010C"
									/>
								</svg>
							</span>
						</FadeAnimation>
					</p>
				</FadeAnimation>
				<br />
				<FadeAnimation
					bottom
					delay={500}
				>
					<Link
						href="/contact"
						className="btn btn-wide btn-primary"
					>
						Contact Us
					</Link>
				</FadeAnimation>
			</div>
		</>
	);
}

export default AboutUsPage;
