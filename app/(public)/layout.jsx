import logo from "@/logos/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaSpotify } from "react-icons/fa";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiApplepodcasts } from "react-icons/si";
import { FiAlertCircle, FiHome, FiLayers, FiMic } from "react-icons/fi";
import NavLink from "./components/nav-links";
import { NavigationEvents } from "./components/navigation-event";

export default function PublicLayout({ children }) {
	return (
		<div className="drawer">
			<Suspense>
				<NavigationEvents />
			</Suspense>
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content block">
				{/* Navbar */}
				<div className="max-w-7xl mx-auto">
					<div className="w-full navbar mt-3 ">
						<div className="navbar-start">
							<div className="flex-none lg:hidden">
								<label
									htmlFor="my-drawer-3"
									aria-label="open sidebar"
									className="btn btn-square btn-ghost"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										className="inline-block w-6 h-6 stroke-current"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										></path>
									</svg>
								</label>
							</div>
							<div className="flex-none px-2 mx-2 relative w-32 h-16">
								<Image
									src={logo}
									alt="overwhelmcomms"
									className="object-contain"
									fill
									priority={true}
									placeholder="blur"
									sizes="128px"
								/>
							</div>
						</div>
						<div className="navbar-center">
							<div className="flex-none hidden lg:block">
								<ul className="menu menu-horizontal">
									{/* Navbar menu content here */}
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
						</div>
						<div className="navbar-end pr-4 md:pr-10">
							<Link
								href="/shop"
								className="btn btn-outline btn-secondary btn-xs md:btn-md"
							>
								Visit Shop
							</Link>
						</div>
					</div>
					{/* Page content here */}
					<main className="px-5 sm:px-10 ">{children}</main>
				</div>
				<footer className="footer p-10 bg-black/10 ">
					<aside>
						<div className="relative h-[180px] aspect-square">
							<Image
								src={logo}
								fill
								placeholder="blur"
								className="object-contain"
								alt="benchmark"
							/>
						</div>
						<p>
							Overwhelmcomms Ltd. <br />
							Inspire, Redefine &amp; Amplifying possibilities
						</p>
					</aside>
					<nav>
						<header className="footer-title">Services</header>
						<Link
							className="link link-hover"
							href="/services/amazon-kdb"
						>
							Amazon KDB
						</Link>
						<a className="link link-hover">Design</a>
						<a className="link link-hover">Marketing</a>
						<a className="link link-hover">Advertisement</a>
					</nav>
					<nav>
						<header className="footer-title">Company</header>
						<Link
							className="link link-hover"
							href="/about-us"
						>
							About Us
						</Link>
						<Link
							className="link link-hover"
							href="/contact"
						>
							Contact
						</Link>
						<Link
							className="link link-hover"
							href="/services"
						>
							Services
						</Link>
					</nav>
					<nav>
						<header className="footer-title">Special</header>
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
					<nav>
						<header className="footer-title">Social Media</header>
						<div className="flex flex-wrap gap-3">
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
				<footer className="footer footer-center p-4 bg-black/20">
					<aside>
						<p>
							Copyright © 2023 - All right reserved by
							Overwhelmcommsd Ltd
						</p>
					</aside>
				</footer>
			</div>
			<div className="drawer-side z-50">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="p-4 w-80 min-h-full bg-base-100">
					<div className="relative h-[100px] ml-6 aspect-square">
						<Image
							src={logo}
							fill
							placeholder="blur"
							className="object-contain"
							alt="benchmark"
							sizes="180px"
						/>
					</div>
					<ul className="menu ">
						{/* Sidebar content here */}
						<li>
							<NavLink path="/">
								<FiHome className="w-5 h-5" />
								<span>Home</span>
							</NavLink>
						</li>
						<li>
							<NavLink path="/about-us">
								<FiAlertCircle className="w-5 h-5" />
								<span>About Us</span>
							</NavLink>
						</li>
						<li>
							<NavLink path="/podcast">
								<FiMic className="w-5 h-5" />
								<span>Podcast</span>
							</NavLink>
						</li>

						<li>
							<NavLink path="/services">
								<FiLayers className="w-5 h-5" />
								<span>Services</span>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
