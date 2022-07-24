import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = (props) => {
	const streamId = props.match.params.id
	useEffect(() => {
		fetchStream(streamId);
		console.log(props.stream);
	});

	const renderContent = () => {
		if (!props.stream) {
			return "Are you sure you want to delete this stream?";
		}

		return `Are you sure you want to delete stream with title: ${props.stream.title}?`;
	};

	const actions = (
		<>
			<button
				className="ui button negative"
				onClick={() => props.deleteStream(streamId)}
			>
				Delete
			</button>
			<Link to="/" className="ui button">
				Cancel
			</Link>
		</>
	);
	return (
		<Modal
			content={renderContent()}
			route="/"
			title="Delete Stream"
			actions={actions}
			onDismiss={() => history.push("/")}
		/>
	);
};

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
