"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiBath } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { LuBedSingle } from "react-icons/lu";
import { MdOutlineOtherHouses } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import Empty from "../../components/empty";
import ImageSliderContainer from "./images";

function DisplayRooms() {
	const searchParams = useSearchParams();
	const ql = searchParams.get("ql");
	const qb = searchParams.get("qb");
	const qp = searchParams.get("qp");

	const [query, setQuery] = useState({
		location: ql ?? "",
		beds: qb ?? "",
		price: qp ?? "",
	});
	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: [
				"apartments",
				page,
				query.location,
				query.beds,
				query.price,
			],
			queryFn: () =>
				axios(
					`/api/apartments?page=${page}&location=${query.location}&price=${query.price}&beds=${query.beds}`
				),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.apartments || {};
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;

	return (
		<>
			<form
				action=""
				className="bg-white rounded-2xl p-5 flex flex-wrap items-end gap-5 mb-10"
			>
				<div className="form-control flex-1">
					<label
						className="label justify-start gap-2"
						htmlFor="location"
					>
						<FiMapPin className="w-5 h-5" />
						<span>Location</span>
					</label>

					<input
						type="text"
						name="location"
						id="location"
						className="input input-bordered"
						value={query.location}
						placeholder="Warri..."
						onChange={(e) =>
							setQuery({
								...query,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
				<div className="form-control flex-1">
					<label
						className="label justify-start gap-2"
						htmlFor="property"
					>
						<BsHouse className="w-5 h-5" />
						<span>Property Type</span>
					</label>
					<select
						name="beds"
						id="property"
						className="select select-bordered"
						value={query.beds}
						onChange={(e) =>
							setQuery({
								...query,
								[e.target.name]: e.target.value,
							})
						}
					>
						<option
							value=""
							disabled
						>
							-- select property --
						</option>
						<option value="1">1 bedroom</option>
						<option value="2">2 bedroom</option>
						<option value="3">3 bedroom</option>
						<option value="all">All</option>
					</select>
				</div>
				<div className="form-control flex-1">
					<label
						className="label justify-start gap-2"
						htmlFor="price"
					>
						<span className="text-xl ">&#8358;</span>
						<span>Price Range</span>
					</label>
					<select
						name="price"
						id="price"
						className="select select-bordered"
						value={query.price}
						onChange={(e) =>
							setQuery({
								...query,
								[e.target.name]: e.target.value,
							})
						}
					>
						<option
							value=""
							disabled
						>
							-- select price --
						</option>
						<option value="50000-120000">50,000 - 120,000</option>
						<option value="120000-300000">120,000-300,000</option>
						<option value="all">All</option>
					</select>
				</div>
			</form>

			<div className="text-right flex font-bold mb-10">
				<div className="w-72 ml-auto">
					{isPending ? (
						<Skeleton />
					) : (
						<span>
							{Math.max(1, limit * (page - 1))} -{" "}
							{limit * (page - 1) + docs?.length || 0} of{" "}
							{commaNumber(totalDocs)}
						</span>
					)}
				</div>
			</div>

			<div className="flex gap-5 flex-wrap mb-20">
				{isPending ? (
					Array(5)
						.fill(2)
						.map((_, i) => (
							<div
								key={i}
								className="w-full sm:w-[calc((100%_-_1.25rem_)_/_2)] md:w-[calc((100%_-_1.25rem_*_2)_/_3)] rounded-2xl overflow-hidden border"
							>
								<div className="relative h-80">
									<Skeleton
										containerClassName="w-full h-full"
										className="h-full w-full"
									/>
								</div>
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
					<>
						{docs && docs.length > 0 ? (
							docs.map((apartment) => (
								<Link
									href={`/rooms/${apartment._id}`}
									key={apartment._id}
									className="block w-full sm:w-[calc((100%_-_1.25rem_)_/_2)] md:w-[calc((100%_-_1.25rem_*_2)_/_3)] rounded-2xl overflow-hidden border hover:border-primary"
								>
									<div className="relative h-80 bg-slate-500">
										<Skeleton
											containerClassName="absolute top-0 left-0 w-full h-full"
											className="h-full w-full"
										/>
										<ImageSliderContainer
											img={
												apartment?.images[0] ??
												"default"
											}
										/>
									</div>
									<div className="p-5 space-y-2 bg-white">
										<h3 className="text-xl font-bold">
											{apartment.title}
										</h3>
										<p className="font-bold text-primary">
											&#8358;{" "}
											{commaNumber(apartment.price)}
										</p>
										<p className="flex items-center gap-2 text-slate-400 text-sm">
											<FiMapPin className="w-5 h-5" />
											<span>{apartment.location}</span>
										</p>
										<div className="flex gap-2">
											<div className="flex-1 flex gap-2 items-center">
												<BiBath className="w-5 h-5 fill-primary" />
												<span>
													{apartment.baths} Baths
												</span>
											</div>
											<div className="flex-1 flex gap-2 items-center">
												<LuBedSingle className="w-5 h-5 stroke-primary" />
												<span>
													{apartment.beds} Beds
												</span>
											</div>
											<div className="flex-1 flex gap-2 items-center">
												<MdOutlineOtherHouses className="w-5 h-5 fill-primary" />
												<span>
													{commaNumber(
														apartment.space
													)}{" "}
													sqft
												</span>
											</div>
										</div>
									</div>
								</Link>
							))
						) : (
							<div className="flex-1 flex justify-center">
								<Empty
									center
									message={"No apartment found"}
								/>
							</div>
						)}
					</>
				)}
			</div>

			{isFetching ? (
				<div className="flex justify-center gap-2 items-center mb-20">
					<span className="loading loading-spinner"></span>
					<span> Loading...</span>
				</div>
			) : null}

			<div className="text-center space-x-5 mb-20">
				<button
					disabled={!hasPrevPage}
					className=" btn btn-sm btn-outline"
					onClick={() => setPage((old) => Math.max(old - 1, 0))}
				>
					<FiChevronLeft />
				</button>
				<span className="">Page {page}</span>
				<button
					disabled={!hasNextPage || isPlaceholderData}
					className="btn btn-sm btn-outline"
					onClick={() => {
						if (!isPlaceholderData && hasNextPage) {
							setPage((old) => old + 1);
						}
					}}
				>
					<FiChevronRight />
				</button>
			</div>
		</>
	);
}

export default DisplayRooms;
