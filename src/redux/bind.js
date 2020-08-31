/*
* If this module is imported as `bind`, then simply exporting any component class as bind(componentClass) allows
* us to easily use all the redux states inside the component.
* */

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";

function mapStateToProps(state) {
	const { user,theme } = state;
	return {
		user,
		theme,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		authenticateUser: bindActionCreators(actions.authenticateUser, dispatch),
		updateTheme: bindActionCreators(actions.updateTheme, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps);