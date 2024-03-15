"use client";

import { BsHouse } from "react-icons/bs";
import { FiMapPin, FiSearch } from "react-icons/fi";

function SearchApartmentForm() {
	return (
		<form
			action="/rooms"
			className="bg-base-100 rounded-tr-xl py-5 px-10 flex flex-wrap items-end gap-5"
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
					name="ql"
					id="location"
					className="input input-bordered"
					placeholder="Warri..."
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
					name="qb"
					id="property"
					className="select select-bordered"
					defaultValue={""}
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
					name="qp"
					id="price"
					className="select select-bordered"
					defaultValue={""}
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
			<div>
				<button className="btn btn-primary">
					<FiSearch />
					Search
				</button>
			</div>
		</form>
	);
}

export default SearchApartmentForm;
