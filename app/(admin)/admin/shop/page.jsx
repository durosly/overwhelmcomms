import React from "react";
import AddItemToShop from "./__components/add-item";
import DisplayItem from "./__components/display-item";

function ShopPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Shop</h2>
			</div>

			<div>
				<AddItemToShop />
			</div>

			<DisplayItem />
		</>
	);
}

export default ShopPage;
