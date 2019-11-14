import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamShow extends React.Component {
	// because user can nivigate directly each component must fetch the streams.
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading</div>;
		}
		return (
			<div>
				<h1>{this.props.stream.title}</h1>
				<h5>{this.props.stream.description}</h5>
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

export default connect(mapStateToProps, { fetchStream })(StreamShow);
