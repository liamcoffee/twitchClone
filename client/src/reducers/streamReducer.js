import _ from 'lodash';
import { CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	userId: null
};

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			// map keys from lodash takes array and returns an object. args(array, key to use for object)
			return { ...state, ..._.mapKeys(action.payload, 'id') };
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			// lodash emit removes element from object returning new object
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
