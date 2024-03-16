import React from "react";
import ItemTitle from "./__components/item-title";
import ItemInfo from "./__components/item-info";
import ItemStatus from "./__components/item-status";
import ItemFeatures from "./__components/item-features";
import ItemImages from "./__components/item-images";
import ItemDestroyBtn from "./__components/item-destroy";

function AdminItemDetailsPage({ params: { id } }) {
	return (
		<>
			<ItemTitle id={id} />

			<div className="flex flex-wrap gap-5 mb-5">
				<ItemInfo id={id} />
				<ItemStatus id={id} />
			</div>

			<ItemFeatures id={id} />

			<ItemImages id={id} />

			<ItemDestroyBtn id={id} />
		</>
	);
}

export default AdminItemDetailsPage;
