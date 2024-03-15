import AddCustomer from "./__components/add-customer";
import CustomersDisplay from "./__components/customers-display";

function AdminCustomersPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Customers</h2>
			</div>
			<AddCustomer />
			<CustomersDisplay />
		</>
	);
}

export default AdminCustomersPage;
