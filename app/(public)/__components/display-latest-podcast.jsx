"use client";

import spotfiyImg from "@/public/images/spotify.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FiMusic } from "react-icons/fi";
import { LuPlayCircle } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import Empty from "../components/empty";
import FadeAnimation from "../components/fade-animation";

function DisplayLatestPodcast() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["podcast", "latest"],
		queryFn: () => axios(`/api/podcast?page=${1}`),
		placeholderData: (previousData) => previousData,
	});

	const queryResponse = data?.data?.podcasts || {};
	const { docs } = queryResponse;

	return (
		<>
			<div className="flex gap-5 flex-wrap mb-20">
				{isPending ? (
					Array(5)
						.fill(2)
						.map((_, i) => (
							<div
								key={i}
								className="w-full sm:w-[calc((100%_-_1.25rem_)_/_2)] md:w-[calc((100%_-_1.25rem_*_2)_/_3)] rounded-2xl overflow-hidden border"
							>
								<div className="p-5 space-y-2 bg-white">
									<h3 className="text-xl font-bold">
										<Skeleton />
									</h3>
									<p className="font-bold text-primary max-w-[60%]">
										<Skeleton />
									</p>
									<p className="flex items-center gap-2 text-slate-400 text-sm max-w-[80%]">
										<Skeleton containerClassName="flex-1" />
									</p>
									<div className="flex gap-2">
										<div className="flex-1 flex gap-2 items-center">
											<Skeleton containerClassName="flex-1" />
										</div>
										<div className="flex-1 flex gap-2 items-center">
											<Skeleton containerClassName="flex-1" />
										</div>
										<div className="flex-1 flex gap-2 items-center">
											<Skeleton containerClassName="flex-1" />
										</div>
									</div>
								</div>
							</div>
						))
				) : isError ? (
					<div>
						<p>{error.message}</p>
					</div>
				) : (
					<FadeAnimation
						top
						cascade
						ssrReveal
					>
						<div className="flex gap-5 flex-wrap">
							{docs && docs.length > 0 ? (
								docs.map((item) => (
									<Link
										href={`${item.link}`}
										target="_blank"
										key={item._id}
										className="relative w-full sm:w-[calc((100%_-_1.25rem)_/_2)] md:w-[calc((100%_-2_*_1.25rem)_/_3)] pb-7 bg-base-100 border rounded-box overflow-hidden"
									>
										<div className="bg-red-500 h-56 relative">
											<Image
												src={`/images/service.jpg`}
												alt={`service`}
												className="object-cover"
												fill
											/>
										</div>
										<div className="bg-base-100 p-2">
											<div className="flex justify-between gap-5 text-sm text-gray-500 border-b py-1 mb-2">
												<p className="font-bold">
													{item.title}
												</p>
												<p>13 Mar, 2024</p>
											</div>
											<div className="flex justify-between gap-5">
												<h3 className="text-sm">
													{item.desc}
												</h3>
												<span className="flex items-center self-start gap-2 whitespace-nowrap">
													<LuPlayCircle className="w-5 h-5" />
												</span>
											</div>
										</div>
										<div className="mt-2 absolute bottom-2 left-2">
											{item.category === "spotify" ? (
												<div className="relative w-5 h-5">
													<Image
														src={spotfiyImg}
														fill
													/>
												</div>
											) : item.category === "apple" ? (
												<div className="relative">
													<svg
														viewBox="0 0 85 85"
														xmlns="http://www.w3.org/2000/svg"
														className="w-5 h-5"
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
											) : (
												<FiMusic className="w-5 h-5" />
											)}
										</div>
									</Link>
								))
							) : (
								<div className="flex-1 flex justify-center">
									<Empty
										center
										message={"No podcast found"}
									/>
								</div>
							)}
						</div>
					</FadeAnimation>
				)}
			</div>
		</>
	);
}

export default DisplayLatestPodcast;
