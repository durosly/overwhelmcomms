import logoImg from "@/logos/logo.png";
import Image from "next/image";
import Link from "next/link";
import {
	FiGrid,
	FiHome,
	FiInfo,
	FiLogOut,
	FiMail,
	FiMousePointer,
	FiSettings,
	FiSidebar,
	FiUsers,
	FiX,
} from "react-icons/fi";
import { FiTag } from "react-icons/fi";
import { NavigationEvents } from "../(public)/components/navigation-event";
import SignoutButton from "../(public)/components/signout-btn";

export const metadata = {
	title: "Admin",
};

function AdminLayout({ children }) {
	return (
		<div className="drawer max-sm:block lg:drawer-open">
			<NavigationEvents />
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col items-center justify-center">
				{/* Page content here */}
				<div className="navbar bg-base-100 lg:hidden">
					<div className="flex-none">
						<label
							htmlFor="my-drawer-3"
							className="btn btn-square btn-ghost"
						>
							<FiSidebar className="inline-block w-5 h-5 stroke-current" />
						</label>
					</div>
					<div className="flex-1">
						<Link
							href="/admin/dashboard"
							className="btn btn-ghost normal-case text-xl"
						>
							Benchmark
						</Link>
					</div>
					<div className="flex-none">
						{/* <div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img src="https://picsum.photos/200" />
								</div>
							</label>
							<ul
								tabIndex={0}
								className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<a className="justify-between">
										Notification
										<span className="badge badge-error">
											9+
										</span>
									</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div> */}
					</div>
				</div>
				<main className="max-lg:min-h-screen h-full w-full p-5 bg-base-200">
					{children}
				</main>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="p-4 w-full min-[350px]:w-80 min-h-full bg-base-100 text-base-content">
					<div className="text-right min-[350px]:hidden">
						<label
							htmlFor="my-drawer-3"
							aria-label="close sidebar"
							className="btn btn-xs btn-square"
						>
							<FiX className="w-5 h-5" />
						</label>
					</div>
					<div className="relative h-14 mb-5">
						<Image
							src={logoImg}
							fill
							alt=""
							className="object-contain"
							sizes="(min-width: 360px) 288px, calc(100vw - 32px)"
						/>
					</div>
					<ul className="menu menu-sm lg:menu-md">
						{/* Sidebar content here */}

						<li>
							<Link href="/admin/dashboard">
								<FiGrid className="h-6 w-6" />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/shop">
								<FiTag className="h-6 w-6" />
								<span>Shop</span>
							</Link>
						</li>
						{/* <li>
							<Link href="/admin/customers">
								<FiUsers className="h-6 w-6" />
								<span>Customers</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/enquires">
								<FiInfo className="h-6 w-6" />
								<span>Enquiries</span>
							</Link>
						</li> */}
						<li>
							<Link href="/admin/messages">
								<FiMail className="h-6 w-6" />
								<span>Messages</span>
							</Link>
						</li>
					</ul>
					<ul className="menu menu-sm lg:menu-md">
						<li></li>
						<li className="menu-title flex flex-row gap-4">
							<FiMousePointer className="w-5 h-5 text-fuchsia-600" />
							<span>Actions</span>
						</li>
						<li>
							<Link href="/admin/settings">
								<FiSettings className="h-5 w-5" />
								<span>Settings</span>
							</Link>
						</li>
						{/* <li>
							<Link href="/admin/contacts">
								<FiPhone className="h-5 w-5" />
								<span>Contacts</span>
							</Link>
						</li> */}
					</ul>
					<div className="menu">
						<SignoutButton className="btn btn-sm btn-error">
							<span>logout</span>
							<FiLogOut />
						</SignoutButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
