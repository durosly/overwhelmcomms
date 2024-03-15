"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ children, path }) {
	const pathname = usePathname();
	return (
		<Link
			href={path}
			className={`${pathname === path ? "link-primary" : ""}`}
		>
			{children}
		</Link>
	);
}

export default NavLink;
