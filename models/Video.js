const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoSchema = new Schema({
	name: { type: String, requiered: true },
	URL: { type: String, requiered: true },
	tag: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tags",
			required: true,
		},
	],
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
