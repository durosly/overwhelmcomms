"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Link from "next/link";
import { useState } from "react";
import { BiBath } from "react-icons/bi";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { LuBedSingle, LuLayoutList, LuPackage2 } from "react-icons/lu";
import { MdOutlineOtherHouses } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import Empty from "../../components/empty";
import ImageSliderContainer from "./images";

function DisplayItems() {
	const [query, setQuery] = useState({
		title: "",
		category: "",
	});
	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["items", page, query.title, query.category],
			queryFn: () =>
				axios(
					`/api/items?page=${page}&title=${query.title}&category=${query.category}`
				),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.items || {};
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
						htmlFor="title"
					>
						<LuPackage2 className="w-5 h-5" />
						<span>Item name</span>
					</label>

					<input
						type="search"
						name="title"
						id="title"
						className="input input-bordered"
						value={query.title}
						placeholder="Item..."
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
						htmlFor="category"
					>
						<LuLayoutList className="w-5 h-5" />
						<span>Category</span>
					</label>
					<select
						name="category"
						id="category"
						className="select select-bordered"
						value={query.category}
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
							-- select category --
						</option>

						<option value="all">All</option>
						<option value="fashion">Fashion</option>
						<option value="furniture and decor">
							furniture and decoration
						</option>
						<option value="media">Media</option>
						<option value="health and wellness">
							health and wellness
						</option>
						<option value="food and beverage">
							food and beverage
						</option>
						<option value="cosmetics and body care">
							Cosmetics and body care
						</option>
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
							docs.map((item) => (
								<Link
									href={`${item.link}`}
									key={item._id}
									target="_blank"
									disabled={item.status === "unavailable"}
									className="block relative w-full sm:w-[calc((100%_-_1.25rem_)_/_2)] md:w-[calc((100%_-_1.25rem_*_2)_/_3)] rounded-2xl overflow-hidden border hover:border-primary"
								>
									<div className="relative h-80 bg-slate-500">
										<Skeleton
											containerClassName="absolute top-0 left-0 w-full h-full"
											className="h-full w-full"
										/>
										<ImageSliderContainer
											img={
												item?.images?.length
													? item.images[0]
													: "default"
											}
										/>
									</div>
									<div className="p-5 space-y-2 bg-white">
										<h3 className="text-xl font-bold">
											{item.title}
										</h3>
										<p className="text-sm">{item.desc}</p>
										<p className="flex items-center gap-2 text-slate-400 text-sm capitalize">
											{/* <FiMapPin className="w-5 h-5" /> */}
											<span>{item.category}</span>
										</p>
										<div className="flex flex-wrap gap-2">
											{item.features.map((feature) => (
												<span className="badge">
													{feature}
												</span>
											))}
										</div>
									</div>
									<span
										className={`absolute top-5 right-5 z-50 badge badge-sm ${
											item.status === "unavailable"
												? "badge-warning"
												: "badge-success"
										}`}
									>
										{item.status}
									</span>
								</Link>
							))
						) : (
							<div className="flex-1 flex justify-center">
								<Empty
									center
									message={"No item found"}
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

export default DisplayItems;
