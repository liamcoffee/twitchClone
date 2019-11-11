import React, { Component } from 'react';

export default class GoogleAuth extends Component {
	// once app loads, we dont know if user is signed in, so set to null
	state = {
		isSignedIn: null
	};
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '736157760735-avf3jfdaeq27nehnur0vhe2as1o3nes5.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					// component level state to re-render once signed in
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					// callback, when called reset the state in function (has to be arrow function to use this!)
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = () => {
		// setting state, component rerenders.
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon">Sign Out</i>
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon">Sign in with Google</i>
				</button>
			);
		}
	}

	render() {
		return <div className="item">{this.renderAuthButton()}</div>;
	}
}
