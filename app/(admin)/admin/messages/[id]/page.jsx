import MessageDestroy from "./__components/message-destroy";
import MessageFull from "./__components/message-full";
import MessageInfo from "./__components/message-info";
import MessageTitle from "./__components/message-title";

function MessagesDetailsPage({ params: { id } }) {
	return (
		<>
			<MessageTitle id={id} />

			<div className="card bg-base-100 mb-5">
				<div className="card-body">
					<h2 className="card-title">Info</h2>

					<MessageInfo id={id} />

					<div className="divider">Message</div>
					<MessageFull id={id} />
				</div>
			</div>

			<MessageDestroy id={id} />
		</>
	);
}

export default MessagesDetailsPage;
