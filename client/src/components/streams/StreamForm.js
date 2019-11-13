import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	// get props and pass into input, {...formProps.input} takes all key value pairs and adds as props! Destructre input from formProps ({input})
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label htmlFor={label}> {label}</label>
				<input id={label} {...input} />
				{this.renderError(meta)}
			</div>
		);
	};

	// get form data from handleSubmit, only fires if validation is passed. i.e. no errors. this action is passed from parent component
	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		console.log(this.props);
		return (
			// once form is submitted, call function on redux form with our method, prevent default is automatically done.
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				{/* always pass name, used a propName. pass component which shows the inputt element! any props will be passed to component */}
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

// validatte function not included within class

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		// no form values,
		errors.title = 'Please enter a title';
	}

	if (!formValues.description) {
		errors.description = 'Please a description';
	}

	return errors;
};

// combine the connect function and redux-form

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);
