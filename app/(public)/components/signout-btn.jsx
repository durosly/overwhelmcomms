"use client";
import { signOut } from "next-auth/react";

function SignoutButton(props) {
	return (
		<button
			onClick={() => signOut()}
			className={props.className}
		>
			{props.children}
		</button>
	);
}

export default SignoutButton;
