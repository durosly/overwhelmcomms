"use client";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { handleClientError } from "@/lib/utils";

const initialState = {
	title: "",
	category: "",
	link: "",
	desc: "",
};

function AddItemToShop() {
	const [item, setItem] = useState(initialState);
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (item) => {
			toastId.current = toast.loading("Adding new item");
			return axios.post("/api/admin/item", item);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["items"],
			});
		},
		onSuccess: () => {
			setItem({ ...initialState });
			toast.success("Item added to shop", { id: toastId.current });
			document.getElementById("add-item").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(item);
	}

	return (
		<div>
			<button
				className="btn btn-primary"
				onClick={() => document.getElementById("add-item").showModal()}
			>
				Add item
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="add-item"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add new item</h3>
					<form
						action=""
						onSubmit={handleSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="title"
								className="label"
							>
								Title
							</label>
							<input
								type="text"
								name="title"
								id="title"
								disabled={isPending}
								className="input input-bordered"
								value={item.title}
								onChange={(e) =>
									setItem({
										...item,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<div className="form-control">
							<label
								htmlFor="category"
								className="label"
							>
								Category
							</label>
							<select
								type="text"
								name="category"
								id="category"
								disabled={isPending}
								className="input input-bordered capitalize"
								value={item.category}
								onChange={(e) =>
									setItem({
										...item,
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
						<div className="form-control">
							<label
								htmlFor="desc"
								className="label"
							>
								Description
							</label>
							<textarea
								className="textarea textarea-bordered"
								name="desc"
								disabled={isPending}
								id="desc"
								rows="3"
								value={item.desc}
								onChange={(e) =>
									setItem({
										...item,
										[e.target.name]: e.target.value,
									})
								}
							></textarea>
						</div>

						<div className="form-control">
							<label
								htmlFor="link"
								className="label"
							>
								Link
							</label>
							<input
								type="url"
								name="link"
								id="link"
								disabled={isPending}
								className="input input-bordered"
								value={item.link}
								onChange={(e) =>
									setItem({
										...item,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<button
							disabled={isPending}
							className="btn btn-primary mt-5"
						>
							Create
						</button>
					</form>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>Close</button>
				</form>
			</dialog>
		</div>
	);
}

export default AddItemToShop;
