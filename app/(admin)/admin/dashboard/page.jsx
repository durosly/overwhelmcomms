import TotalCustomer from "./__components/total-customer";
import TotalProperties from "./__components/total-properties";

function DashboardPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Dashboard</h2>
			</div>

			<div className="flex flex-col sm:flex-row flex-wrap gap-10">
				<TotalProperties />
				<TotalCustomer />
			</div>
		</>
	);
}

export default DashboardPage;
