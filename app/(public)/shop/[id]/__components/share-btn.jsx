"use client";
import { usePathname } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isMobile } from "react-device-detect";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import {
	EmailShareButton,
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

function ShareBtn({ title, description }) {
	const pathname = usePathname();

	const data = {
		url: `${process.env.NEXT_PUBLIC_URL}${pathname}`,
		title,
		text: description.substring(0, 300),
	};
	async function handleClick() {
		if (typeof window !== "undefined") {
			if (!navigator.share || !navigator.canShare(data) || !isMobile) {
				document.getElementById("share-modal").showModal();
			} else {
				await navigator.share(data);
			}
		}
	}

	return (
		<>
			<button
				onClick={handleClick}
				className="btn btn-sm btn-ghost btn-square"
			>
				<FiShare2 />
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id="share-modal"
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center">
						<h3 className="font-bold text-2xl mb-5">
							Share this with your community
						</h3>
						<div className="space-x-2">
							<WhatsappShareButton
								title={data.title}
								url={data.url}
							>
								<div className="hover:scale-125 transition-transform flex w-10 aspect-square rounded-full justify-center items-center bg-primary/10">
									<BsWhatsapp className="w-5 h-5 " />
								</div>
							</WhatsappShareButton>
							<TwitterShareButton
								title={data.title}
								url={data.url}
								hashtags={[
									"benchmark",
									"housing",
									"realestate",
								]}
							>
								<div className="hover:scale-125 transition-transform flex w-10 aspect-square rounded-full justify-center items-center bg-primary/10">
									<FaXTwitter className="w-5 h-5 " />
								</div>
							</TwitterShareButton>
							<FacebookShareButton
								quote={data.title}
								url={data.url}
								hashtags={[
									"benchmark",
									"housing",
									"realestate",
								]}
							>
								<div className="hover:scale-125 transition-transform flex w-10 aspect-square rounded-full justify-center items-center bg-primary/10">
									<FaFacebookF className="w-5 h-5 " />
								</div>
							</FacebookShareButton>
							<TelegramShareButton
								title={data.title}
								url={data.url}
							>
								<div className="hover:scale-125 transition-transform flex w-10 aspect-square rounded-full justify-center items-center bg-primary/10">
									<FaTelegramPlane className="w-5 h-5 " />
								</div>
							</TelegramShareButton>
							<EmailShareButton
								subject={data.title}
								url={data.url}
								body={data.text}
							>
								<div className="hover:scale-125 transition-transform flex w-10 aspect-square rounded-full justify-center items-center bg-primary/10">
									<MdOutlineEmail className="w-5 h-5 " />
								</div>
							</EmailShareButton>
						</div>

						<div className="mt-5">
							<p className="text-xs text-slate-500 mb-1">
								Copy link to page
							</p>
							<div className="join ">
								<input
									className="input input-bordered join-item"
									type="text"
									name="link"
									id="link"
									readOnly
									defaultValue={data.url}
								/>
								<CopyToClipboard
									text={data.url}
									onCopy={() => alert("copied")}
								>
									<button className="btn join-item">
										<FiCopy />
									</button>
								</CopyToClipboard>
							</div>
						</div>

						<p className="py-4 text-xs">
							{!isMobile ? "Press ESC key or " : null}
							click outside to close
						</p>
					</div>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ShareBtn;
