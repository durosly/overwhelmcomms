"use client";

import Empty from "@/app/(public)/components/empty";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

function ItemFeatures({ id }) {
	const queryClient = useQueryClient();
	const [edit, setEdit] = useState(false);
	const [features, setFeatures] = useState([]);
	const [feature, setFeature] = useState("");

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["items", { itemId: id }],
		queryFn: () => axios(`/api/admin/item/${id}`),
	});

	let toastId = useRef(null);

	const { isPending: isPendingMutation, mutate } = useMutation({
		mutationFn: (features) => {
			toastId.current = toast.loading("Updating item features...");
			return axios.put(`/api/admin/item/${id}/features`, {
				features,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["items"],
			});
		},
		onSuccess: () => {
			toast.success("Item features updated", {
				id: toastId.current,
			});
			setEdit(false);
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const queryResponse = data?.data?.item || {};
	const { features: dbFeatures } = queryResponse;

	useEffect(() => {
		if (queryResponse?.features) {
			setFeatures(dbFeatures);
		}
	}, [queryResponse]);

	if (isError) {
		return (
			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Features</h2>
					<p>{error.message}</p>
				</div>
			</div>
		);
	}

	function addFeatureToList(e) {
		e.preventDefault();

		const newList = [...new Set([...features, feature])];
		setFeatures([...newList]);
		setFeature("");
	}

	function removeFromList(item) {
		const newList = features.filter((feat) => feat !== item);
		setFeatures([...newList]);
	}

	return (
		<div className="card bg-base-100 mb-5">
			<div className="card-body">
				<h2 className="card-title">Features</h2>
				{edit ? (
					<form
						action="/nice"
						className="sm:flex gap-3 mb-5"
						onSubmit={addFeatureToList}
					>
						<div className="form-control flex-1 max-sm:mb-3">
							<input
								type="text"
								className="input input-bordered"
								value={feature}
								onChange={(e) => setFeature(e.target.value)}
								disabled={isPendingMutation}
							/>
						</div>
						<button
							disabled={isPendingMutation}
							className="btn btn-primary"
						>
							Add
						</button>
					</form>
				) : null}

				{edit ? (
					features.length > 0 ? (
						features.map((item) => (
							<li
								key={item}
								className="flex gap-2 items-center"
							>
								<FiCheckCircle className="stroke-success" />
								<span>{item}</span>

								<button
									onClick={() => removeFromList(item)}
									disabled={isPendingMutation}
									className="btn btn-sm btn-square btn-error"
								>
									<FiTrash2 />
								</button>
							</li>
						))
					) : null
				) : (
					<ul className="mb-5 space-y-2">
						{isPending ? (
							<Skeleton count={5} />
						) : dbFeatures && dbFeatures.length > 0 ? (
							dbFeatures.map((item) => (
								<li
									key={item}
									className="flex gap-2 items-center"
								>
									<FiCheckCircle className="stroke-success" />
									<span>{item}</span>
								</li>
							))
						) : (
							<Empty message={"No features added yet"} />
						)}
					</ul>
				)}

				<div className="card-actions">
					{edit ? (
						<>
							<button
								disabled={isPendingMutation}
								onClick={() => mutate(features)}
								className="btn btn-primary"
							>
								Save
							</button>
							<button
								className="btn"
								disabled={isPendingMutation}
								onClick={() => setEdit(false)}
							>
								Cancel
							</button>
						</>
					) : (
						<button
							className="btn btn-primary"
							onClick={() => setEdit(true)}
							disabled={isPending}
						>
							Edit
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ItemFeatures;
