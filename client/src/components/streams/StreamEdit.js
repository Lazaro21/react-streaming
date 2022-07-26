import React, { useEffect } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForms";

const StreamEdit = (props) => {
	const streamId = props.match.params.id;

	useEffect(() => {
		props.fetchStream(streamId);
	},);

	const onSubmit = (formValues) => {
		props.editStream(streamId, formValues);
	};

	const renderingEditForm = () => {
		if (!props.stream) {
			return <div>...</div>;
		}
		return (
			<>
				<h3>Edit a Stream</h3>
				<StreamForm
					initialValues={_.pick(props.stream, "title", "description")}
					onSubmit={onSubmit}
				/>
			</>
		);
	};

	return <div>{renderingEditForm()}</div>;
};

const mapStateToProps = (state, ownProps) => {
	// console.log(ownProps)
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
