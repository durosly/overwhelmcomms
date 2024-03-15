import Image from "next/image";
import mapImg from "@/public/images/map.jpg";
import { FiNavigation } from "react-icons/fi";
import FadeAnimation from "@/components/fade-animation";

export const metadata = {
	title: "Find out where to find us and our properties",
};

function LocationPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Locations</h2>
			<p className="mb-10">
				You can find us at several locations which includes:
			</p>
			<div className="md:flex gap-5 mb-20">
				<div className="flex-1 relative h-64 rounded-2xl overflow-hidden bg-slate-300 border">
					<Image
						src={mapImg}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex-1 mt-10 md:mt-0">
					<FadeAnimation
						right
						cascade
						ssrReveal
					>
						<ul className="space-y-4">
							<li className="flex gap-2 items-center">
								<FiNavigation className="w-5 h-5 stroke-primary rotate-45" />
								<p>No 9, Edumu area, Nigeria</p>
							</li>
							<li className="flex gap-2 items-center">
								<FiNavigation className="w-5 h-5 stroke-primary rotate-45" />
								<p>No 9, Edumu area, Nigeria</p>
							</li>
							<li className="flex gap-2 items-center">
								<FiNavigation className="w-5 h-5 stroke-primary rotate-45" />
								<p>No 9, Edumu area, Nigeria</p>
							</li>
							<li className="flex gap-2 items-center">
								<FiNavigation className="w-5 h-5 stroke-primary rotate-45" />
								<p>No 9, Edumu area, Nigeria</p>
							</li>
						</ul>
					</FadeAnimation>
				</div>
			</div>
		</>
	);
}

export default LocationPage;
