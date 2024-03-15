import DisplayMessages from "./__components/display-messages";

function MessagesPage() {
	return (
		<>
			<div className="mb-5">
				<h2 className="text-2xl font-bold">Messages</h2>
			</div>

			<DisplayMessages />
		</>
	);
}

export default MessagesPage;
