import { combineReducers } from 'redux';
import authReducer from './authReducer';

// import all other reducers and combining into one function

export default combineReducers({
	auth: authReducer
});
