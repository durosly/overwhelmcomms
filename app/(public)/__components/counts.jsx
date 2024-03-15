"use client";

import FadeAnimation from "../components/fade-animation";
import CountUp from "react-countup";

function Counts() {
	return (
		<FadeAnimation
			cascade
			top
			duration={1500}
		>
			<div className="flex gap-5 justify-center flex-wrap mb-20 ">
				<div className="flex-1 text-center">
					<p className="text-2xl md:text-4xl text-primary font-bold">
						<CountUp
							end={600}
							duration={4}
						/>
						+
					</p>
					<p>Apartments</p>
				</div>
				<div className="flex-1 text-center">
					<p className="text-2xl md:text-4xl text-primary font-bold">
						<CountUp
							end={24}
							duration={4}
						/>
						+
					</p>
					<p>Properties</p>
				</div>
				<div className="flex-1 text-center">
					<p className="text-2xl md:text-4xl text-primary font-bold">
						<CountUp
							end={60}
							duration={4}
						/>
						+
					</p>
					<p>Tenants</p>
				</div>
				<div className="flex-1 text-center">
					<p className="text-2xl md:text-4xl text-primary font-bold">
						<CountUp
							end={80}
							duration={4}
						/>
						+
					</p>
					<p>Locations</p>
				</div>
			</div>
		</FadeAnimation>
	);
}

export default Counts;
