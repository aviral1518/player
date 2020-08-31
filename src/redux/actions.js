import { AUTHENTICATE_USER, UPDATE_THEME } from "./types";

function authenticateUser(user) {
	return {
		type: AUTHENTICATE_USER,
		user,
	};
}

function updateTheme(theme) {
	return {
		type: UPDATE_THEME,
		theme,
	};
}

const actionCreators = {
	authenticateUser,
	updateTheme,
};

export { actionCreators };