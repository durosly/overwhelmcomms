import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import ContactForm from "./__components/contact-form";
import FadeAnimation from "../components/fade-animation";

export const metadata = { title: "Find out how to reach us" };

function ContactUsPage() {
	return (
		<>
			<div className="mb-20">
				<h2 className="text-4xl font-bold mt-5">Contact Us</h2>
				<p className="text-2xl ">
					We can&apos;t wait to hear from you.
				</p>
			</div>

			<div className="md:flex mb-10">
				<div className="flex-1">
					<h2 className="text-2xl font-bold mb-5">Get in touch</h2>
					<FadeAnimation
						cascade
						left
					>
						<ul className="space-y-2">
							<li className="flex gap-2 items-center">
								<FiMapPin className="stroke-primary" />
								<p>
									House 2 Nice Boundaries Estate, Lekki,
									Lagos.
								</p>
							</li>
							<li className="flex gap-2 items-center">
								<FiMail className="stroke-primary" />
								<a href="mailto:info@benchmark.com">
									info@benchmark.com
								</a>
							</li>
							<li className="flex gap-2 items-center">
								<FiPhone className="stroke-primary" />
								<a href="tel:+2347063069903">
									+234 7063 0699 03
								</a>
							</li>
						</ul>
					</FadeAnimation>
				</div>
				<div className="flex-1 mt-10 md:mt-0">
					<div>
						<h2 className="text-2xl font-bold">
							Leave us a message
						</h2>
					</div>
					<ContactForm />
				</div>
			</div>
		</>
	);
}

export default ContactUsPage;
