"use client";
import { useRouter } from "next/navigation";

function ReturnBtn({ children, className }) {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			className={className}
		>
			{children}
		</button>
	);
}

export default ReturnBtn;
