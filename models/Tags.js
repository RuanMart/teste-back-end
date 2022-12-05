const mongoose = require("mongoose");

const { Schema } = mongoose;

const tagsSchema = new Schema({
	tag_name: { type: String, required: true },
	videos: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Videos",
	},
});

const Tags = mongoose.model("Tags", tagsSchema);

module.exports = Tags;
