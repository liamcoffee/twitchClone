import { SIGN_IN, SIGN_OUT } from './types';

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
