import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	// because user can nivigate directly each component must fetch the streams.
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};
	render() {
		if (!this.props.stream) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<h3>Edit a stream</h3>
				{/* initalvalues accepts an object containing the vals, magic!, the stream prop contains these already! evertyhing is passed so we use lodash to pick the props i want */}
				<StreamForm
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

// second argument for this is a refrence to the exisiting props on this component
const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
