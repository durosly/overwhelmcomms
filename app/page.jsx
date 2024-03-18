import logo from "@/logos/logo.png";
import Image from "next/image";
import Link from "next/link";
import spotfiyImg from "@/public/images/spotify.png";
import coverOne from "@/public/images/cover-1.png";
import { LuMusic4 } from "react-icons/lu";
import { LuPause } from "react-icons/lu";
import { LuSkipForward } from "react-icons/lu";
import { LuStepBack } from "react-icons/lu";
import { LuShuffle } from "react-icons/lu";
import { LuRepeat } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { LuAlignLeft } from "react-icons/lu";
import { LuCheckCircle } from "react-icons/lu";
import { LuCake } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import { LuWifi } from "react-icons/lu";
import { LuSmartphoneNfc } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { SiApplepodcasts } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import NavLink from "./(public)/components/nav-links";
import FadeAnimation from "@/components/fade-animation";

export const metadata = { title: "Your One-Stop Consulting Hub" };

function Home() {
	return (
		<>
			<div>
				<div className="px-5 sm:px-10 md:px-20">
					<header className="navbar ">
						<div className="navbar-start">
							<div className="dropdown md:hidden">
								<div
									tabIndex={0}
									role="button"
									className="btn btn-ghost btn-sm m-1"
								>
									<LuAlignLeft />
								</div>
								<ul
									tabIndex={0}
									className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
								>
									<li>
										<NavLink path="/">Home</NavLink>
									</li>
									<li>
										<NavLink path="/about-us">
											About Us
										</NavLink>
									</li>
									<li>
										<NavLink path="/services">
											Services
										</NavLink>
									</li>
									<li>
										<NavLink path="/podcast">
											Podcast
										</NavLink>
									</li>
									<li>
										<NavLink path="/contact">
											Contact
										</NavLink>
									</li>
								</ul>
							</div>
							<div className="relative w-12 h-12">
								<Image
									src={logo}
									fill
									placeholder="blur"
								/>
							</div>
						</div>

						<nav className="navbar-center max-md:hidden">
							<ul className="menu menu-horizontal px-1">
								<li>
									<NavLink path="/">Home</NavLink>
								</li>
								<li>
									<NavLink path="/about-us">About Us</NavLink>
								</li>
								<li>
									<NavLink path="/services">Services</NavLink>
								</li>
								{/* <li>
										<NavLink path="/locations">
											Locations
										</NavLink>
									</li> */}
								<li>
									<NavLink path="/contact">Contact</NavLink>
								</li>
							</ul>
						</nav>

						<div className="navbar-end">
							<Link
								href="/shop"
								className="btn btn-outline btn-secondary btn-xs md:btn-md"
							>
								Visit Shop
							</Link>
						</div>
					</header>
					<div className="lg:flex gap-10">
						<div className=" md:w-1/2 space-y-10">
							<div>
								<h2 className="text-[24px] sm:text-[clamp(36px,_7vw,_50px)] font-bold mt-10 md:mt-20 uppercase">
									Overwhelmm Communications
								</h2>
								<p className="max-sm:text-sm">
									Ignite your journey to unprecedented
									heights, where boundaries fade, and
									standards are redefined. Propel yourself
									into a realm of limitless potential and
									innovation. Unleash the power to amplify
									possibilities, setting the stage for a world
									where your aspirations know no bounds.
								</p>
							</div>
							<div className="flex flex-wrap gap-5">
								<Link
									className="btn btn-primary md:btn-wide"
									href="/about-us"
								>
									Learn more...
								</Link>

								<Link
									className="btn"
									href="/shop"
								>
									Shop with us
								</Link>
							</div>

							<div className="flex gap-5 flex-wrap mt-10">
								<div className="flex gap-3">
									<div>
										<svg
											viewBox="0 0 85 85"
											xmlns="http://www.w3.org/2000/svg"
											className="w-10 h-10"
										>
											<linearGradient
												id="a"
												gradientTransform="matrix(1 0 0 -1 0 -164)"
												gradientUnits="userSpaceOnUse"
												x1="42.5"
												x2="42.5"
												y1="-165.5"
												y2="-247.4998"
											>
												<stop
													offset="0"
													stopColor="#d56efc"
												></stop>
												<stop
													offset="1"
													stopColor="#832bc1"
												></stop>
											</linearGradient>
											<path
												d="m0 0h85v85h-85z"
												fill="none"
											></path>
											<path
												d="m83.5 27.15c0-.98 0-1.96-.01-2.94-.01-.83-.01-1.65-.04-2.47-.05-1.8-.15-3.61-.47-5.39-.32-1.8-.85-3.48-1.69-5.12-.82-1.61-1.89-3.08-3.17-4.36s-2.75-2.35-4.36-3.17c-1.64-.83-3.32-1.36-5.12-1.69-1.78-.32-3.59-.43-5.39-.47-.82-.02-1.65-.03-2.47-.04-.97 0-1.95 0-2.93 0h-30.7c-.98 0-1.96 0-2.94.01-.83.01-1.65.01-2.47.04-1.8.05-3.61.15-5.39.47-1.8.32-3.48.85-5.12 1.69-1.61.81-3.08 1.88-4.36 3.16s-2.35 2.75-3.17 4.36c-.83 1.64-1.36 3.32-1.69 5.12-.32 1.78-.43 3.59-.47 5.38-.02.82-.03 1.65-.04 2.47v2.95 30.7c0 .98 0 1.96.01 2.94.01.83.01 1.65.04 2.47.05 1.8.15 3.61.47 5.39.32 1.8.85 3.48 1.69 5.12.82 1.61 1.89 3.08 3.17 4.36s2.75 2.35 4.36 3.17c1.64.83 3.32 1.36 5.12 1.69 1.78.32 3.59.43 5.39.47.82.02 1.65.03 2.47.04.98.01 1.96.01 2.94.01h30.7c.98 0 1.96 0 2.94-.01.83-.01 1.65-.01 2.47-.04 1.8-.05 3.61-.15 5.39-.47 1.8-.32 3.48-.85 5.12-1.69 1.61-.82 3.08-1.89 4.36-3.17s2.35-2.75 3.17-4.36c.83-1.64 1.36-3.32 1.69-5.12.32-1.78.43-3.59.47-5.39.02-.82.03-1.65.04-2.47.01-.98.01-1.96.01-2.94z"
												fill="url(#a)"
											></path>
											<path
												d="m42.47 31.32c3.39 0 6.14 2.75 6.14 6.13 0 3.39-2.75 6.13-6.14 6.13s-6.14-2.75-6.14-6.13c.01-3.38 2.76-6.13 6.14-6.13zm17.67 8.28c0 6.05-3.06 11.4-7.72 14.59-.24.16-.56-.02-.54-.31.07-1.08.09-2.03.03-3.01-.02-.32.11-.64.34-.86 2.78-2.61 4.52-6.31 4.52-10.41 0-8.06-6.72-14.59-14.85-14.27-7.48.29-13.52 6.4-13.72 13.89-.11 4.25 1.65 8.11 4.51 10.8.24.22.36.53.34.86-.06.98-.04 1.93.03 3.01.02.29-.3.47-.54.31-4.72-3.22-7.8-8.67-7.72-14.82.12-9.35 7.62-17.05 16.96-17.41 10.05-.4 18.36 7.67 18.36 17.63zm-17.74-26.35c14.57-.04 26.44 11.8 26.44 26.36 0 11.48-7.38 21.26-17.64 24.87-.25.09-.51-.12-.47-.38.14-.9.26-1.81.38-2.7.04-.31.24-.59.53-.71 8.13-3.55 13.82-11.66 13.82-21.07 0-12.74-10.42-23.09-23.18-22.98-12.48.08-22.68 10.26-22.8 22.74-.09 9.51 5.63 17.72 13.82 21.3.29.13.49.4.53.71.12.89.25 1.8.38 2.7.04.26-.22.47-.47.38-10.36-3.64-17.78-13.58-17.64-25.2.19-14.34 11.95-25.98 26.3-26.02zm.07 32.82c2.33 0 4.31.76 5.43 1.95.59.62.9 1.25 1 2.16.19 1.75.08 3.26-.12 5.67-.2 2.3-.57 5.36-1.05 8.48-.34 2.22-.62 3.42-.88 4.28-.41 1.39-1.96 2.61-4.38 2.61s-3.96-1.22-4.38-2.61c-.26-.86-.54-2.06-.88-4.28-.48-3.12-.86-6.18-1.05-8.48-.21-2.41-.31-3.92-.12-5.67.1-.9.41-1.54 1-2.16 1.12-1.19 3.1-1.95 5.43-1.95z"
												fill="#fff"
											></path>
										</svg>
									</div>
									<div>
										<h3 className="text-sm opacity-50">
											Podcast Platform
										</h3>
										<p className="text-sm font-bold">
											Apple Podcast
										</p>
									</div>
								</div>
								<div className="flex gap-3">
									<div className="relative w-10 h-10">
										<Image
											src={spotfiyImg}
											fill
										/>
									</div>
									<div>
										<h3 className="text-sm opacity-50">
											Podcast Platform
										</h3>
										<p className="text-sm font-bold">
											Spotify Podcast
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex-1 md:w-1/2 relative max-lg:mt-5">
							<div className="relative max-lg:hidden">
								<Image
									src={coverOne}
									placeholder="blur"
									className="object-cover "
								/>
							</div>

							<div className=" w-5/6 bg-base-100 rounded-btn overflow-hidden border-2 flex">
								<div className="w-16 h-16 bg-primary flex justify-center items-center ">
									<LuMusic4 className="w-10 h-10" />
								</div>
								<div className="px-7 py-2 flex-1">
									<div className="flex gap-5">
										<LuRepeat />
										<LuStepBack />
										<LuPause />
										<LuSkipForward />
										<LuShuffle />
									</div>
									<div className="flex gap-3 items-center mt-2">
										<span>03:14</span>
										<progress
											className="progress progress-primary w-full"
											value="10"
											max="100"
										></progress>
										<span>12:04</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<FadeAnimation
						bottom
						ssrReveal
					>
						<div className="mx-auto max-w-sm flex gap-4 items-center bg-success/50 p-5 rounded-btn mt-20">
							<LuSparkles className="w-5 h-5" />
							<p className="text-xs">
								Best comprehensive consulting company in Africa
							</p>
							<LuSparkles className="w-5 h-5" />
						</div>
					</FadeAnimation>
				</div>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="fill-primary relative top-1"
			>
				<path
					// fill="#1F4774"
					fillOpacity={1}
					d="M0,64L26.7,53.3C53.3,43,107,21,160,42.7C213.3,64,267,128,320,160C373.3,192,427,192,480,186.7C533.3,181,587,171,640,170.7C693.3,171,747,181,800,208C853.3,235,907,277,960,272C1013.3,267,1067,213,1120,181.3C1173.3,149,1227,139,1280,144C1333.3,149,1387,171,1413,181.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
				/>
			</svg>
			<div className="bg-primary px-5 sm:px-10 md:px-20 pb-10">
				<div className="flex gap-10 bg-fruit">
					<div className="flex-1 text-white space-y-5">
						<FadeAnimation
							top
							ssrReveal
						>
							<h2 className="text-4xl">
								Our passion, Your entertainment
							</h2>
						</FadeAnimation>
						<FadeAnimation
							bottom
							delay={400}
							ssrReveal
						>
							<p className="text-sm">
								At Overwhelm Communication International, we are
								committed to inspiring, redefining, and
								amplifying possibilities with one event, idea,
								and product at a time. Through our innovative
								solutions, creative vision, and unwavering
								dedication.
							</p>
						</FadeAnimation>
						<FadeAnimation
							left
							delay={800}
							ssrReveal
						>
							<Link
								href="/about-us"
								className="btn btn-secondary"
							>
								Learn more...
							</Link>
						</FadeAnimation>
					</div>
					{/* <div className="flex-1"></div> */}
				</div>
			</div>
			<svg
				id="wave"
				style={{ transform: "rotate(180deg)", transition: "0.3s" }}
				viewBox="0 0 1440 200"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				className="relative -top-1"
			>
				<defs>
					<linearGradient
						id="sw-gradient-0"
						x1={0}
						x2={0}
						y1={1}
						y2={0}
					>
						<stop
							stopColor="rgba(31, 71, 116, 1)"
							offset="0%"
						/>
						<stop
							stopColor="rgba(31, 71, 116, 1)"
							offset="100%"
						/>
					</linearGradient>
				</defs>
				<path
					style={{ transform: "translate(0, 0px)", opacity: 1 }}
					fill="url(#sw-gradient-0)"
					d="M0,60L48,80C96,100,192,140,288,143.3C384,147,480,113,576,106.7C672,100,768,120,864,106.7C960,93,1056,47,1152,30C1248,13,1344,27,1440,46.7C1536,67,1632,93,1728,113.3C1824,133,1920,147,2016,156.7C2112,167,2208,173,2304,160C2400,147,2496,113,2592,86.7C2688,60,2784,40,2880,53.3C2976,67,3072,113,3168,113.3C3264,113,3360,67,3456,56.7C3552,47,3648,73,3744,86.7C3840,100,3936,100,4032,96.7C4128,93,4224,87,4320,96.7C4416,107,4512,133,4608,140C4704,147,4800,133,4896,106.7C4992,80,5088,40,5184,36.7C5280,33,5376,67,5472,93.3C5568,120,5664,140,5760,130C5856,120,5952,80,6048,73.3C6144,67,6240,93,6336,113.3C6432,133,6528,147,6624,146.7C6720,147,6816,133,6864,126.7L6912,120L6912,200L6864,200C6816,200,6720,200,6624,200C6528,200,6432,200,6336,200C6240,200,6144,200,6048,200C5952,200,5856,200,5760,200C5664,200,5568,200,5472,200C5376,200,5280,200,5184,200C5088,200,4992,200,4896,200C4800,200,4704,200,4608,200C4512,200,4416,200,4320,200C4224,200,4128,200,4032,200C3936,200,3840,200,3744,200C3648,200,3552,200,3456,200C3360,200,3264,200,3168,200C3072,200,2976,200,2880,200C2784,200,2688,200,2592,200C2496,200,2400,200,2304,200C2208,200,2112,200,2016,200C1920,200,1824,200,1728,200C1632,200,1536,200,1440,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
				/>
			</svg>

			<div className="flex max-sm:flex-col gap-5 px-5 sm:px-10 md:px-20 mt-10 mb-14">
				<div className="flex-1">
					<div className="relative aspect-square sm:h-[400px] rounded-2xl overflow-hidden">
						<Image
							src="https://images.pexels.com/photos/2480072/pexels-photo-2480072.jpeg"
							fill
							className="object-cover"
						/>
					</div>
				</div>
				<div className="flex-1 space-y-5">
					<FadeAnimation
						right
						ssrReveal
					>
						<h2 className="text-4xl font-bold">
							What makes us{" "}
							<span className="text-primary">unique</span> from
							others
						</h2>
					</FadeAnimation>
					<FadeAnimation
						left
						ssrReveal
						delay={400}
					>
						<p>
							At Overwhelm Communication International, we pride
							ourselves on offering unparalleled services tailored
							to meet your unique needs. Here&apos;s why we stand
							out from the crowd:
						</p>
					</FadeAnimation>
					<FadeAnimation
						top
						ssrReveal
						delay={600}
						cascade
					>
						<ul className="space-y-2 capitalize">
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>We prefer a Tailored Approach.</p>
							</li>
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>
									We provide Expertise Across several
									Industries.
								</p>
							</li>
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>We are Customer-Centric.</p>
							</li>
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>We provide Innovative Solutions.</p>
							</li>
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>We pay Attention to Detail.</p>
							</li>
							<li className="flex gap-5 items-center">
								<LuCheckCircle className="w-5 text-success" />
								<p>We provide Seamless Execution.</p>
							</li>
						</ul>
					</FadeAnimation>
				</div>
			</div>

			<div className="px-5 sm:px-10 md:px-20 space-y-10 text-center mb-10">
				<FadeAnimation
					top
					ssrReveal
				>
					<h2 className="text-4xl font-bold">
						What we do <span className="text-primary">best</span>
					</h2>
				</FadeAnimation>

				<FadeAnimation
					bottom
					ssrReveal
					cascade
					delay={300}
				>
					<div className="flex flex-wrap gap-5">
						<div className=" sm:w-[calc((100%_-_1_*_1.25rem)_/_2)] md:w-[calc((100%_-_3_*_1.25rem)_/_4)]">
							<div className="w-20 aspect-square bg-primary/10 rounded-full mx-auto flex justify-center items-center">
								<LuCake className="w-10 h-10 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">Events</h3>
							<p>
								We specialize in planning and managing events
								whether educational or social
							</p>
						</div>
						<div className=" sm:w-[calc((100%_-_1_*_1.25rem)_/_2)] md:w-[calc((100%_-_3_*_1.25rem)_/_4)]">
							<div className="w-20 aspect-square bg-primary/10 rounded-full mx-auto flex justify-center items-center">
								<LuSmartphoneNfc className="w-10 h-10 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Communication
							</h3>
							<p>
								We specialize in planning and managing events
								whether educational or social
							</p>
						</div>
						<div className=" sm:w-[calc((100%_-_1_*_1.25rem)_/_2)] md:w-[calc((100%_-_3_*_1.25rem)_/_4)]">
							<div className="w-20 aspect-square bg-primary/10 rounded-full mx-auto flex justify-center items-center">
								<LuWifi className="w-10 h-10 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Online broadcast
							</h3>
							<p>
								We specialize in planning and managing events
								whether educational or social
							</p>
						</div>
						<div className=" sm:w-[calc((100%_-_1_*_1.25rem)_/_2)] md:w-[calc((100%_-_3_*_1.25rem)_/_4)]">
							<div className="w-20 aspect-square bg-primary/10 rounded-full mx-auto flex justify-center items-center">
								<LuShoppingBag className="w-10 h-10 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">Marketing</h3>
							<p>
								We specialize in planning and managing events
								whether educational or social
							</p>
						</div>
					</div>
				</FadeAnimation>

				<FadeAnimation
					bottom
					delay={600}
					ssrReveal
				>
					<p className="p-5 bg-primary/10 rounded-xl">
						Experience the Overwhelm Communication International
						difference today and discover why we&apos;re the
						preferred choice for all your event planning and
						consulting needs.
					</p>
				</FadeAnimation>
			</div>

			<svg
				id="wave"
				style={{ transform: "rotate(0deg)", transition: "0.3s" }}
				viewBox="0 0 1440 100"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				className="relative top-1"
			>
				<defs>
					<linearGradient
						id="sw-gradient-0"
						x1={0}
						x2={0}
						y1={1}
						y2={0}
					>
						<stop
							stopColor="rgba(31, 71, 116, 1)"
							offset="0%"
						/>
						<stop
							stopColor="rgba(31, 71, 116, 1)"
							offset="100%"
						/>
					</linearGradient>
				</defs>
				<path
					style={{ transform: "translate(0, 0px)", opacity: 1 }}
					fill="url(#sw-gradient-0)"
					d="M0,40L48,46.7C96,53,192,67,288,61.7C384,57,480,33,576,33.3C672,33,768,57,864,61.7C960,67,1056,53,1152,48.3C1248,43,1344,47,1440,41.7C1536,37,1632,23,1728,26.7C1824,30,1920,50,2016,61.7C2112,73,2208,77,2304,65C2400,53,2496,27,2592,23.3C2688,20,2784,40,2880,50C2976,60,3072,60,3168,60C3264,60,3360,60,3456,61.7C3552,63,3648,67,3744,65C3840,63,3936,57,4032,55C4128,53,4224,57,4320,51.7C4416,47,4512,33,4608,38.3C4704,43,4800,67,4896,76.7C4992,87,5088,83,5184,71.7C5280,60,5376,40,5472,30C5568,20,5664,20,5760,28.3C5856,37,5952,53,6048,58.3C6144,63,6240,57,6336,46.7C6432,37,6528,23,6624,18.3C6720,13,6816,17,6864,18.3L6912,20L6912,100L6864,100C6816,100,6720,100,6624,100C6528,100,6432,100,6336,100C6240,100,6144,100,6048,100C5952,100,5856,100,5760,100C5664,100,5568,100,5472,100C5376,100,5280,100,5184,100C5088,100,4992,100,4896,100C4800,100,4704,100,4608,100C4512,100,4416,100,4320,100C4224,100,4128,100,4032,100C3936,100,3840,100,3744,100C3648,100,3552,100,3456,100C3360,100,3264,100,3168,100C3072,100,2976,100,2880,100C2784,100,2688,100,2592,100C2496,100,2400,100,2304,100C2208,100,2112,100,2016,100C1920,100,1824,100,1728,100C1632,100,1536,100,1440,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
				/>
			</svg>

			<footer className="footer p-10 bg-primary text-white ">
				<nav>
					<h6 className="footer-title">Services</h6>
					<Link
						href="/services"
						className="link link-hover"
					>
						Event management
					</Link>
					<Link
						href="/services"
						className="link link-hover"
					>
						Podcast production
					</Link>
					<Link
						href="/services"
						className="link link-hover"
					>
						Product marketing
					</Link>
					<Link
						href="/services"
						className="link link-hover"
					>
						Communication consultants
					</Link>
				</nav>
				<nav>
					<h6 className="footer-title">Company</h6>
					<Link
						href="/about-us"
						className="link link-hover"
					>
						About us
					</Link>
					<Link
						href="/contact"
						className="link link-hover"
					>
						Contact
					</Link>
				</nav>
				<nav>
					<h6 className="footer-title">Special</h6>
					<Link
						href="/shop"
						className="link link-hover"
					>
						Shop
					</Link>
					<Link
						href="/podcast"
						className="link link-hover"
					>
						Podcast
					</Link>
				</nav>
			</footer>
			<div className="bg-base-200">
				<svg
					id="wave"
					style={{ transform: "rotate(180deg)", transition: "0.3s" }}
					viewBox="0 0 1440 100"
					className="relative -top-1"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<linearGradient
							id="sw-gradient-0"
							x1={0}
							x2={0}
							y1={1}
							y2={0}
						>
							<stop
								stopColor="rgba(31, 71, 116, 1)"
								offset="0%"
							/>
							<stop
								stopColor="rgba(31, 71, 116, 1)"
								offset="100%"
							/>
						</linearGradient>
					</defs>
					<path
						style={{ transform: "translate(0, 0px)", opacity: 1 }}
						fill="url(#sw-gradient-0)"
						d="M0,70L34.3,60C68.6,50,137,30,206,31.7C274.3,33,343,57,411,60C480,63,549,47,617,40C685.7,33,754,37,823,45C891.4,53,960,67,1029,66.7C1097.1,67,1166,53,1234,40C1302.9,27,1371,13,1440,15C1508.6,17,1577,33,1646,46.7C1714.3,60,1783,70,1851,68.3C1920,67,1989,53,2057,41.7C2125.7,30,2194,20,2263,20C2331.4,20,2400,30,2469,31.7C2537.1,33,2606,27,2674,26.7C2742.9,27,2811,33,2880,31.7C2948.6,30,3017,20,3086,15C3154.3,10,3223,10,3291,11.7C3360,13,3429,17,3497,30C3565.7,43,3634,67,3703,76.7C3771.4,87,3840,83,3909,75C3977.1,67,4046,53,4114,43.3C4182.9,33,4251,27,4320,35C4388.6,43,4457,67,4526,76.7C4594.3,87,4663,83,4731,80C4800,77,4869,73,4903,71.7L4937.1,70L4937.1,100L4902.9,100C4868.6,100,4800,100,4731,100C4662.9,100,4594,100,4526,100C4457.1,100,4389,100,4320,100C4251.4,100,4183,100,4114,100C4045.7,100,3977,100,3909,100C3840,100,3771,100,3703,100C3634.3,100,3566,100,3497,100C3428.6,100,3360,100,3291,100C3222.9,100,3154,100,3086,100C3017.1,100,2949,100,2880,100C2811.4,100,2743,100,2674,100C2605.7,100,2537,100,2469,100C2400,100,2331,100,2263,100C2194.3,100,2126,100,2057,100C1988.6,100,1920,100,1851,100C1782.9,100,1714,100,1646,100C1577.1,100,1509,100,1440,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"
					/>
				</svg>
			</div>

			<footer className="footer px-10 py-4 bg-base-200 text-base-content">
				<aside className="items-center grid-flow-col">
					<div className="relative w-12 h-12">
						<Image
							src={logo}
							fill
							placeholder="blur"
						/>
					</div>
					<p>
						Overwhelm Communication International. <br />
						Inspire, Redefine &amp; Amplifying possibilities
					</p>
				</aside>
				<nav className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						<a>
							<FaXTwitter className="w-5 h-5" />
						</a>
						<a>
							<FaYoutube className="w-5 h-5" />
						</a>
						<a>
							<FaFacebookF className="w-5 h-5" />
						</a>
						<a href="">
							<FaSpotify className="w-5 h-5" />
						</a>
						<a href="">
							<SiApplepodcasts className="w-5 h-5" />
						</a>
					</div>
				</nav>
			</footer>
		</>
	);
}

export default Home;
