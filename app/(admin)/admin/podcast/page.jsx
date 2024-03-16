import React from "react";
import AddPodcast from "./__components/add-podcast";
import DisplayPodcast from "./__components/display-podcast";

function AdminPodcast() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Podcast</h2>
			</div>

			<AddPodcast />

			<DisplayPodcast />
		</>
	);
}

export default AdminPodcast;
