const mongoose = require("mongoose");

const { Schema } = mongoose;

const profileSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

const Profile = mongoose.model("Profiles", profileSchema);

module.exports = Profile;
