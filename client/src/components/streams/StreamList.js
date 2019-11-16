import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import axios from 'axios';

export const StreamList = () => {
	const dispatch = useDispatch();

	// dispatch our action! only called once because second array is passed.
	useEffect(() => {
		dispatch(fetchStreams());
	}, []);

	// get streams from store
	const streams = Object.values(useSelector((state) => state.streams));

	// get current userId from store
	const userId = useSelector((state) => state.auth.userId);

	// get value of isSignedIn
	const isSignedIn = useSelector((state) => state.auth.isSignedIn);

	const renderAdmin = (stream, userId) => {
		console.log(`running ${userId} stream id is ${stream.id}`);
		if (stream.userId === userId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	};

	const renderList = (streams) => {
		return streams.map((stream) => {
			return (
				<div className="item" key={stream.id}>
					{renderAdmin(stream, userId)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						<Link to={`/streams/${stream.id}`}>{stream.title}</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	};

	const renderCreate = () => {
		if (isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	};

	return (
		<>
		<div className="ui celled list">{renderList(streams)}</div>
		{renderCreate()}
		</>
	); 
};
