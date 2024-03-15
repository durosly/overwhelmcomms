import AddApartment from "./__components/add-apartment";
import ApartmentsDisplay from "./__components/apartments-display";

function ApartmentsPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Apartments/Properties</h2>
			</div>
			<AddApartment />
			<ApartmentsDisplay />
		</>
	);
}

export default ApartmentsPage;
