import ApartmentDescription from "./__components/apartment-desc";
import ApartmentDestroyBtn from "./__components/apartment-destroy";
import ApartmentFeatures from "./__components/apartment-features";
import ApartmentImages from "./__components/apartment-images";
import ApartmentInfo from "./__components/apartment-info";
import ApartmentOccupant from "./__components/apartment-occupant";
import ApartmentStatus from "./__components/apartment-status";
import ItemTitle from "./__components/apartment-title";
import ApartmentVideo from "./__components/apartment-video";

function ApartmentDetailsPage({ params: { id } }) {
	return (
		<>
			<ItemTitle id={id} />

			<div className="flex flex-wrap gap-5 mb-5">
				<ApartmentInfo id={id} />
				<ApartmentStatus id={id} />
			</div>

			<ApartmentDescription id={id} />

			<ApartmentFeatures id={id} />

			<ApartmentImages id={id} />

			<ApartmentVideo id={id} />

			<ApartmentOccupant id={id} />

			<ApartmentDestroyBtn id={id} />
		</>
	);
}

export default ApartmentDetailsPage;
