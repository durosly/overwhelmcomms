import AuthForm from "./__components/auth-form";

function page() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Settings</h2>
			</div>
			<div className="card bg-base-100">
				<div className="card-body">
					<h2 className="card-title">Login info</h2>
					<AuthForm />
				</div>
			</div>
		</>
	);
}

export default page;
