import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DisplayEnquiries from "./__components/display-enquiries";

function Enquires() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Enquiries</h2>
			</div>

			<DisplayEnquiries />
		</>
	);
}

export default Enquires;
