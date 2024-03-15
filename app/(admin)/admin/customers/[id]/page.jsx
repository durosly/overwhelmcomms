import DeleteCustomer from "../__components/delete-customer";
import CustomerActivities from "./__components/customer-activities";
import CustomerApartments from "./__components/customer-apartments";
import CustomerType from "./__components/customer-type";
import UserInfo from "./__components/user-info";

function AdminCustomerDetailsPage({ params: { id } }) {
	return (
		<>
			<UserInfo id={id} />

			<div className="flex flex-wrap gap-5 mb-5">
				<CustomerType id={id} />
				<CustomerApartments id={id} />
			</div>

			<CustomerActivities id={id} />

			<DeleteCustomer id={id} />
		</>
	);
}

export default AdminCustomerDetailsPage;
