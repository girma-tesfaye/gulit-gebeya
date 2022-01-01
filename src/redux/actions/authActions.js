import * as type from '../../constants/constants';

export const signIn = (email, password) => ({		//authsaga
	type: type.SIGNIN,
	payload: {
		email,
		password
	}
});

export const phoneSignIn = (phone, password) => ({		//authsaga
	type: type.PHONE_SIGNIN,
	payload: {
		phone,
		password
	}
});

export const phoneSignUp = user => ({				//authsaga
	type: type.PHONE_SIGNUP,
	payload: user
});

export const signInWithGoogle = () => ({		//authsaga
	type: type.SIGNIN_WITH_GOOGLE
});

export const signInWithFacebook = () => ({		//authsaga
	type: type.SIGNIN_WITH_FACEBOOK
});

export const signInWithGithub = () => ({		//authsaga
	type: type.SIGNIN_WITH_GITHUB
});

export const signUp = user => ({				//authsaga
	type: type.SIGNUP,
	payload: user
});

export const signInSuccess = auth => ({			//authreducer
	type: type.SIGNIN_SUCCESS,
	payload: auth
});

export const setAuthPersistence = () => ({		//authsaga
	type: type.SET_AUTH_PERSISTENCE
});

export const signOut = () => ({					//authsaga
	type: type.SIGNOUT
});

export const signOutSuccess = () => ({			//authreducer
	type: type.SIGNOUT_SUCCESS
});

export const onAuthStateChanged = () => ({
	type: type.ON_AUTHSTATE_CHANGED
});

export const onAuthStateSuccess = user => ({	//authsaga
	type: type.ON_AUTHSTATE_SUCCESS,
	payload: user
});

export const onAuthStateFail = error => ({		//authsaga
	type: type.ON_AUTHSTATE_FAIL,
	payload: error
});

export const resetPassword = email => ({			//authsaga
	type: type.RESET_PASSWORD,
	payload: email
});

