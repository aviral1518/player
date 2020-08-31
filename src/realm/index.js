import * as Realm from "realm";
import userSchema from "./userSchema";
import themeSchema from "./themeSchema";

function connect(cb) {
	Realm.open({
		schema: [userSchema, themeSchema],
		schemaVersion: 6,
	}).then(cb);
}

export default connect;