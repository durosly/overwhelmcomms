import Image from "next/image";
import frontApartment from "@/public/images/front-apartment.png";
import { FiEye, FiCrosshair } from "react-icons/fi";
import Link from "next/link";
import FadeAnimation from "@/components/fade-animation";

export const metadata = { title: "Learn about us and what we do" };

function AboutUsPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">About Us</h2>
			<p className="mb-20">
				Welcome to a groundbreaking student accommodation concept,
				meticulously crafted with your comfort and convenience in mind.
				At Benchmark, we understand that the journey through higher
				education is not just about textbooks and lectures; it&apos;s
				also about the quality of life you experience during your
				student years. That&apos;s why we&apos;ve reimagined student
				housing, creating a living environment that goes beyond
				traditional dormitories and apartments.
			</p>

			<div className="md:flex gap-10 mb-20">
				<FadeAnimation
					left
					ssrReveal
				>
					<div className="relative w-full md:w-96 h-52 md:h-auto aspect-square rounded-2xl overflow-hidden">
						<Image
							src={frontApartment}
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
									Our Vision
								</h2>
							</FadeAnimation>
						</div>
						<FadeAnimation
							right
							ssrReveal
							delay={1000}
						>
							<p>
								At Benchmark, we&apos;ve set out to redefine the
								student living experience. We believe that every
								student deserves a comfortable, safe, and
								inspiring place to call home while pursuing
								their educational dreams. Our vision is to
								create vibrant and supportive communities that
								foster personal and academic growth, making your
								university years truly memorable.
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
									Our Goals
								</h2>
							</FadeAnimation>
						</div>
						<FadeAnimation
							right
							delay={1000}
							ssrReveal
						>
							<p>
								At Benchmark, our goal is to provide you with a
								student living experience that enhances your
								academic journey, fosters personal growth, and
								creates unforgettable memories. We invite you to
								explore our exceptional properties and see for
								yourself how we&apos;re redefining the way
								students live during their university years.
							</p>
						</FadeAnimation>
					</div>
					<FadeAnimation
						right
						delay={1000}
						ssrReveal
					>
						<p>
							Your education is a journey, and we&apos;re here to
							make it extraordinary. Discover a new standard of
							student living with us.
						</p>
					</FadeAnimation>
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
						At Benchmark Real Estate Company, we understand that
						finding the perfect student accommodation is a crucial
						decision in your academic journey. Here&apos;s why you
						should choose us:
					</p>
				</FadeAnimation>
				<div className="flex flex-wrap gap-10 mb-20">
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Specialized for Students
							</h3>
							<p>
								We specialize in student housing, which means
								our properties are designed with your needs in
								mind. From quiet study spaces to vibrant common
								areas, we offer the perfect blend of comfort and
								convenience for students like you.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Proximity to Campuses
							</h3>
							<p>
								Our properties are strategically located near
								universities and colleges, making it easy for
								you to commute to classes and access campus
								facilities without the hassle of long commutes.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Safety First
							</h3>
							<p>
								Your safety is our top priority. Our properties
								feature advanced security systems and 24/7
								surveillance to ensure you can focus on your
								studies with peace of mind.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Modern Amenities
							</h3>
							<p>
								Enjoy the convenience of modern amenities,
								including high-speed internet, fully equipped
								kitchens, laundry facilities, and more, all
								designed to make your student life comfortable.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Community Living
							</h3>
							<p>
								We foster a sense of community. You&apos;ll have
								the opportunity to meet like-minded students,
								engage in social activities, and build lasting
								friendships that will enrich your college
								experience.
							</p>
						</div>
					</FadeAnimation>
					<FadeAnimation top>
						<div className="sm:w-[calc((100%_-_2.5rem)_/_2)] md:w-[calc((100%_-_2.5rem_*_2)_/_3)] text-center border py-10 px-10 rounded-2xl bg-primary/10 border-primary">
							<h3 className="font-bold text-xl mb-5">
								Responsive Support
							</h3>
							<p>
								Our dedicated management team is always ready to
								assist you. Whether it&apos;s a maintenance
								request, a question, or guidance on local
								resources, we&apos;re here to ensure your stay
								is hassle-free.
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
						Choosing Benchmark Real Estate Company means choosing a
						student accommodation experience that is tailored to
						your academic and personal growth. We are committed to
						helping you make the most of your university years. Join
						our community today and discover the ideal place to call
						home during your educational journey.
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
