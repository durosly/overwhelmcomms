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

function AddPodcast() {
	const [podcast, setPodcast] = useState(initialState);
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (podcast) => {
			toastId.current = toast.loading("Adding new podcast");
			return axios.post("/api/admin/podcast", podcast);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["podcast"],
			});
		},
		onSuccess: () => {
			setPodcast({ ...initialState });
			toast.success("Podcast added", { id: toastId.current });
			document.getElementById("add-podcast").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(podcast);
	}

	return (
		<div>
			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("add-podcast").showModal()
				}
			>
				Add new podcast
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="add-podcast"
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add new podcast</h3>
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
								value={podcast.title}
								onChange={(e) =>
									setPodcast({
										...podcast,
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
								value={podcast.category}
								onChange={(e) =>
									setPodcast({
										...podcast,
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
								<option value="spotify">spotify</option>
								<option value="apple">apple</option>
								<option value="others">others</option>
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
								value={podcast.desc}
								onChange={(e) =>
									setPodcast({
										...podcast,
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
								value={podcast.link}
								onChange={(e) =>
									setPodcast({
										...podcast,
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

export default AddPodcast;
