import {
	CLEAR_PROFILE,
	SET_PROFILE,
	UPDATE_EMAIL,
	UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS
} from '../../constants/constants';

export const clearProfile = () => ({                        //profilereducer
	type: CLEAR_PROFILE
});

export const setProfile = user => ({                        //profilereducer
	type: SET_PROFILE,
	payload: user
});

export const updateEmail = (password, newEmail) => ({       //profilesaga
	type: UPDATE_EMAIL,
	payload: {
		password,
		newEmail
	}
});

export const updateProfile = newProfile => ({           //profilesaga
	type: UPDATE_PROFILE,
	payload: {
		updates: newProfile.updates,
		files: newProfile.files,
		credentials: newProfile.credentials
	}
});

export const updateProfileSuccess = updates => ({       //profilereducer
	type: UPDATE_PROFILE_SUCCESS,
	payload: updates
});
