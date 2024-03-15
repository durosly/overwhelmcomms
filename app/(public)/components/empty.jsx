import { FiPackage } from "react-icons/fi";

function Empty({ message, center = true }) {
	return (
		<div>
			<FiPackage className={`w-20 h-20 ${center ? "mx-auto" : ""} `} />
			<p className={`font-bold ${center ? "text-center" : ""} `}>
				{message}
			</p>
		</div>
	);
}

export default Empty;
