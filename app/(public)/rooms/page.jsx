import DisplayRooms from "./__components/display-rooms";

export const metadata = {
	title: "Find an apartment/property that meets your dream",
};

function RoomsPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Rooms</h2>

			<DisplayRooms />
		</>
	);
}

export default RoomsPage;
