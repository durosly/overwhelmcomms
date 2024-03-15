import logoText from "@/logos/logo-text.png";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import ReturnBtn from "../../components/return-btn";
import ApartmentDesc from "./__components/apartment-desc";
import ApartmentFeatures from "./__components/apartment-features";
import ApartmentImages from "./__components/apartment-images";
import ApartmentInfo from "./__components/apartment-info";
import ApartmentTitle from "./__components/apartment-title";
import ApartmentVideo from "./__components/apartment-video";
import ApartmentEnquireForm from "./__components/apartment-enquire-form";
import ApartmentModel from "@/models/apartment";

// TODO: use getMetadata here
export async function generateMetadata({ params: { id } }, parent) {
	// fetch data
	const apartment = await ApartmentModel.findById(id);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];
	let image = "/images/og-main.png";

	if (apartment.images.length > 0) {
		image = `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_URL}${apartment.images[0]}`;
	}

	return {
		title: apartment.title,
		openGraph: {
			images: [image, ...previousImages],
		},
	};
}

function RoomDetailsPage({ params: { id } }) {
	return (
		<>
			<ReturnBtn className="btn btn-sm btn-ghost">
				<FiArrowLeft />
				<span>Back to search</span>
			</ReturnBtn>
			<ApartmentTitle id={id} />

			<ApartmentInfo id={id} />

			<div className="md:flex gap-10 mb-20">
				<ApartmentImages id={id} />
				<ApartmentDesc id={id} />
			</div>
			<div className="md:flex space-y-20 md:space-y-0 gap-20 mb-20">
				<div className="flex-1 bg-white p-5 sm:p-10 rounded-2xl">
					<ApartmentFeatures id={id} />

					<div className="divider"></div>
					<ApartmentVideo id={id} />
				</div>
				<div className="flex-1 bg-white p-5 sm:p-10 rounded-2xl">
					<div className="relative h-8 mb-10">
						<Image
							src={logoText}
							fill
							className="object-contain"
							alt="benchmark"
						/>
					</div>
					<div className="text-center space-y-2 mb-10">
						<p>
							Send a message by{" "}
							<span className="font-bold">WhatsApp</span>
						</p>
						<a
							href="https://wa.me/+2347063069903"
							className="btn btn-outline btn-primary"
						>
							<BsWhatsapp className="fill-success" />{" "}
							+2347063069903
						</a>
					</div>
					<div className="divider">Or submit an enquiry</div>
					<ApartmentEnquireForm id={id} />
				</div>
			</div>
		</>
	);
}

export default RoomDetailsPage;
