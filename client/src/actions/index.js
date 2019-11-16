import streams from '../apis/streams';
import createBrowserHistory from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAMS, FETCH_STREAM, DELETE_STREAM, EDIT_STREAM } from './types';

// get google userID and assign it to the payload
export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

// Create new stream, using redux thunk we await for response then dispatch the action to the reducers.
// Dispatch second argument allows us to ge the state! (redux THUNK)

export const createStream = (formValues) => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formValues, userId });

	dispatch({ type: CREATE_STREAM, payload: response.data });
	// do some programmatic navigation to get the user back to stream list. added a bcustom history object instead of browserhistory which we import here

	createBrowserHistory.push('/');
};

// Get list of streams!
export const fetchStreams = () => async (dispatch) => {
	console.log('fetching streams');
	const response = await streams.get('/streams');

	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Get single stream!
export const fetchStream = (streamId) => async (dispatch) => {
	const response = await streams.get(`/streams/${streamId}`);

	dispatch({ type: FETCH_STREAM, payload: response.data });
};

// edit the stream, changed to patch as put updates all  records, removing non passed values. Used PATCH INSTEAD
export const editStream = (streamId, formValues) => async (dispatch) => {
	console.log('editing');
	const repsonse = await streams.patch(`/streams/${streamId}`, formValues);

	dispatch({ type: EDIT_STREAM, payload: repsonse.data });

	createBrowserHistory.push('/');
};

// delete the stream
export const deleteStream = (streamId) => async (dispatch) => {
	await streams.delete(`/streams/${streamId}`);

	dispatch({ type: DELETE_STREAM, payload: streamId });
	createBrowserHistory.push('/');
};
