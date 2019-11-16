import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
	// get form data from handleSubmit, only fires if validation is passed. i.e. no errors.
	onSubmit = (formValues) => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div>
				<h3>Create new stream</h3>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

// 1) mapstatetoprops, actionCreator
export default connect(null, { createStream })(StreamCreate);
