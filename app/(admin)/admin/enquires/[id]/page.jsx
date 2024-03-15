import EnquireDestroy from "./__components/enquire-destroy";
import EnquireInfo from "./__components/enquire-info";
import EnquireMessage from "./__components/enquire-message";
import EnquireTitle from "./__components/enquire-title";

function EnquiriesDetailsPage({ params: { id } }) {
	return (
		<>
			<EnquireTitle id={id} />

			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Info</h2>

					<EnquireInfo id={id} />

					<div className="divider">Message</div>
					<EnquireMessage id={id} />
				</div>
			</div>

			<EnquireDestroy id={id} />
		</>
	);
}

export default EnquiriesDetailsPage;
