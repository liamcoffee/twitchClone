import _ from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

export const StreamEdit = (props) => {
	const dispatch = useDispatch();

	// dispatch our action! only called once because second array is passed.
	useEffect(() => {
		dispatch(fetchStream(props.match.params.id));
	}, []);

	// get stream from store that matches id

	const stream = useSelector((state) => state.streams[props.match.params.id]);

	var onSubmit = (formValues) => {
		console.log(`valuesa are ${formValues}`);
		dispatch(editStream(props.match.params.id, formValues));
	};

	// necessary to prevent errors
	if (typeof stream === 'undefined') return <span>loading...</span>;

	return (
		<div>
			<h3>Edit a stream </h3>
			{/* initalvalues accepts an object containing the vals, magic!, the stream prop contains these already! evertyhing is passed so we use lodash to pick the props i want */}
			<StreamForm
				initialValues={{ title: stream.title, description: stream.description }}
				onSubmit={() => onSubmit()}
			/>
		</div>
	);
};

// class StreamEdit extends React.Component {
// 	// because user can nivigate directly each component must fetch the streams.
// 	componentDidMount() {
// 		this.props.fetchStream(this.props.match.params.id);
// 	}

// 	onSubmit = (formValues) => {
// 		this.props.editStream(this.props.match.params.id, formValues);
// 	};
// 	render() {
// 		if (!this.props.stream) {
// 			return <div>Loading</div>;
// 		}
// 		return (
// 			<div>
// 				<h3>Edit a stream</h3>
// 				{/* initalvalues accepts an object containing the vals, magic!, the stream prop contains these already! evertyhing is passed so we use lodash to pick the props i want */}
// 				<StreamForm
// 					initialValues={_.pick(this.props.stream, 'title', 'description')}
// 					onSubmit={this.onSubmit}
// 				/>
// 			</div>
// 		);
// 	}
// }

// // second argument for this is a refrence to the exisiting props on this component
// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		stream: state.streams[ownProps.match.params.id]
// 	};
// };

// export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
