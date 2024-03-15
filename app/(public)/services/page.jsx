import Image from "next/image";
import serviceImg from "@/public/images/service.jpg";
import {
	FiEye,
	FiWifi,
	FiBatteryCharging,
	FiSettings,
	FiMap,
	FiPhoneCall,
	FiCoffee,
} from "react-icons/fi";
import FadeAnimation from "@/components/fade-animation";

export const metadata = { title: "Find out what else we can do for you" };

function ServicesPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Services</h2>
			<p className="mb-20">
				At Benchmark Real Estate Company, we take pride in offering a
				wide range of services designed to elevate your student
				accommodation experience. We believe that your comfort and
				well-being are paramount, and our services reflect this
				commitment. Explore the services that set us apart:
			</p>

			<div className="md:flex gap-10 mb-20">
				<div className="relative w-full bg-slate-300 md:w-96 h-52 md:h-auto aspect-square rounded-2xl overflow-hidden">
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
									<FiWifi className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Unlimited internet connection
								</h2>
							</div>
							<p className="pl-10">
								We offer a 24/7 unlimited Internet connection.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiBatteryCharging className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Water &amp; Power Supply
								</h2>
							</div>
							<p className="pl-10">
								There is constant water supply for bathing and
								we provide dispenser water for drinking.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiSettings className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Repairs
								</h2>
							</div>
							<p className="pl-10">
								We have ready to work people to fix any problems
								that occur.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiMap className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Transportation
								</h2>
							</div>
							<p className="pl-10">
								We offer transportation for students, to and
								from school.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiPhoneCall className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									24/7 support
								</h2>
							</div>
							<p className="pl-10">
								We have a matron ready to attend to the students
								and we are just a call away.
							</p>
						</div>
						<div>
							<div className="flex gap-2 items-center mb-2">
								<div className="w-8 bg-primary/20 rounded-md aspect-square flex justify-center items-center">
									<FiCoffee className="w-4 h-4 stroke-primary" />
								</div>
								<h2 className="text-xl font-semibold text-left">
									Breakfast
								</h2>
							</div>
							<p className="pl-10">
								We provide breakfast for the students. There is
								a cook available to prepare the food every
								morning.
							</p>
						</div>
					</div>
				</FadeAnimation>
			</div>
			<FadeAnimation bottom>
				<p className="mb-20">
					At Benchmark Real Estate Company, our services are tailored
					to provide you with a hassle-free, secure, and comfortable
					student living experience. We believe that the services we
					offer will enhance your time in university, allowing you to
					focus on your studies and enjoy your vibrant student
					community. Discover the Benchmark difference today.
				</p>
			</FadeAnimation>
		</>
	);
}

export default ServicesPage;
