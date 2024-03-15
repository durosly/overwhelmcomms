import DisplayItems from "./__components/display-items";

export const metadata = {
	title: "Get quality items/mercendies",
};

function RoomsPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Shop</h2>

			<DisplayItems />
		</>
	);
}

export default RoomsPage;
