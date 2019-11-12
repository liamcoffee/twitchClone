import { SIGN_IN, SIGN_OUT } from '../actions/types';

// setting a default state, reducer gets called on boot so we need a default value. All caps shows it is constant, do not modify.
const INITIAL_STATE = {
	isSignedIn: null,
	userId: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null };
		default:
			return state;
	}
};
