import LoginForm from "./__components/login-form";

function AdminLoginPage() {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content ">
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<h2 className="text-2xl font-bold text-center mt-5">
						Admin Login
					</h2>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}

export default AdminLoginPage;
