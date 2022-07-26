import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
	const videoRef = useRef();
	const streamId = props.match.params.id;

	useEffect(() => {
		// console.log(videoRef);
		props.fetchStream(streamId);
		buildPlayer();

		const cleanUp = () => {
			console.log("test")
		};

		return cleanUp;
	}, []);

	const buildPlayer = () => {
		let player = null;
		if (player || !props.stream) {
			return;
		}

		player = flv.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${streamId}.flv`,
		});
		player.attachMediaElement(videoRef.current);
	};

	const renderStream = () => {
		if (!props.stream) {
			return <div>...</div>;
		}
		return (
			<div>
				<video ref={videoRef} style={{ width: "100%" }} controls />
				<h1>{props.stream.title}</h1>
				<h5>{props.stream.description}</h5>
			</div>
		);
	};

	return <>{renderStream()}</>;
};

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
