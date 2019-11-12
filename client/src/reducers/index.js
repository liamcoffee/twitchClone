import { combineReducers } from 'redux';
// rename reducer to avoid confusion
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

// import all other reducers and combining into one function

export default combineReducers({
	auth: authReducer,
	form: formReducer
});
