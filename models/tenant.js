import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
	customerId: String,
	apartmentId: String,
	customerName: String,
	createdAt: { type: Date, default: Date.now },
});

const TenantModel =
	mongoose.models.Tenant || mongoose.model("Tenant", tenantSchema);

export default TenantModel;
