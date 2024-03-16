export const metadata = {
	title: "Podcast",
};

import React from "react";
import DisplayPodcast from "./__components/display-podcast";

function PodcastPage() {
	return (
		<>
			<h2 className="text-4xl font-bold my-5">Podcast</h2>

			<DisplayPodcast />
		</>
	);
}

export default PodcastPage;
