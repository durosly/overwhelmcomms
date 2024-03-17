import TotalItems from "./__components/total-item";
import TotalPodcast from "./__components/total-podcast";

function DashboardPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Dashboard</h2>
			</div>

			<div className="flex flex-col sm:flex-row flex-wrap gap-10">
				<TotalPodcast />
				<TotalItems />
			</div>
		</>
	);
}

export default DashboardPage;
