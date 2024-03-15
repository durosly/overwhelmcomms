"use client";
import { queryClient } from "@/app/(public)/components/client-wrapper";
import { RadioGroup } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { FiHome, FiKey } from "react-icons/fi";
import { VscQuestion } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

function CustomerType({ id }) {
	let [type, setType] = useState("");

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["customers", { customerId: id }],
		queryFn: () => axios(`/api/admin/customers/${id}`),
	});

	let toastId = useRef(null);

	const { mutate, isPending: isMutationPending } = useMutation({
		mutationFn: (type) => {
			toastId.current = toast.loading("Updating customer type...");
			return axios.put(`/api/admin/customers/${id}/type`, { type });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: async () => {
			setType("");
			toast.success("Customer type updated", { id: toastId.current });

			return await queryClient.invalidateQueries({
				queryKey: ["customers", { customerId: id }],
			});
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const queryResponse = data?.data?.customer || {};

	if (isError) {
		return (
			<div className="flex-1 card bg-base-100">
				<div className="card-body">
					<h2 className="text-2xl font-bold">Error</h2>
					<p>An Error occured: {error.message}</p>
				</div>
			</div>
		);
	}
	return (
		<div className="flex-1 card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Type</h2>
				<p className="flex gap-2">
					<span>Current:</span>
					<span className="font-bold capitalize flex flex-1">
						{isPending ? (
							<Skeleton containerClassName="flex-1 max-w-xs" />
						) : (
							queryResponse.type
						)}
					</span>
				</p>
				<div className="divider"></div>

				<RadioGroup
					value={type}
					onChange={setType}
					as={"div"}
					className="flex flex-wrap gap-5 mb-2"
				>
					<RadioGroup.Option value="enquiry">
						{({ checked }) => (
							<button
								disabled={queryResponse.type === "enquiry"}
								className={`flex gap-2 items-center disabled:cursor-not-allowed bg-primary ${
									checked
										? "bg-opacity-50"
										: "bg-opacity-10 hover:bg-opacity-25"
								}  py-1 px-4 rounded-md`}
							>
								<VscQuestion />
								<span>Enquiry</span>
							</button>
						)}
					</RadioGroup.Option>
					<RadioGroup.Option value="retal">
						{({ checked }) => (
							<button
								disabled={queryResponse.type === "retal"}
								className={`flex gap-2 items-center disabled:cursor-not-allowed bg-primary ${
									checked
										? "bg-opacity-50"
										: "bg-opacity-10 hover:bg-opacity-25"
								}  py-1 px-4 rounded-md`}
							>
								<FiKey />
								<span>Retal</span>
							</button>
						)}
					</RadioGroup.Option>
					<RadioGroup.Option value="purchase">
						{({ checked }) => (
							<button
								disabled={queryResponse.type === "purchase"}
								className={`flex gap-2 items-center disabled:cursor-not-allowed bg-primary ${
									checked
										? "bg-opacity-50"
										: "bg-opacity-10 hover:bg-opacity-25"
								}  py-1 px-4 rounded-md`}
							>
								<FiHome />
								<span>Purchase</span>
							</button>
						)}
					</RadioGroup.Option>
				</RadioGroup>

				<div className="card-actions justify-end">
					<button
						disabled={isMutationPending}
						onClick={() => {
							if (!type) {
								toast("Select customer type to update");
								return;
							}
							mutate(type);
						}}
						className="btn btn-sm btn-outline btn-primary"
					>
						Update
					</button>
				</div>
			</div>
		</div>
	);
}

export default CustomerType;
