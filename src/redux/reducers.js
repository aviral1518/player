import { AUTHENTICATE_USER, UPDATE_THEME } from "./types";

const initialState = {
	user: {
		signInMethod: "EMAIL",
		avatarSource: "",
		name: "",
		nameAbbr: "",
		phone: "",
		email: "",
		password: "",
	},
	theme: "LIGHT",
};

function applyAuthenticateUser(state, user) {
	const {
		signInMethod,
		avatarSource,
		name,
		nameAbbr,
		phone,
		email,
		password,
	} = user;

	return {
		user: {
			signInMethod,
			avatarSource,
			name,
			nameAbbr,
			phone,
			email,
			password,
		},
		theme: state.theme,
	};
}

function applyUpdateTheme(state, theme) {
	return {
		user: state.user,
		theme,
	};
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATE_USER:
			return applyAuthenticateUser(state, action.user);
		case UPDATE_THEME:
			return applyUpdateTheme(state, action.theme);
		default:
			return state;
	}
}

export default reducer;