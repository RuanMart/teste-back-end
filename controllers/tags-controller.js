const Tag = require("../models/Tags.js");

const Video = require("../models/Video.js");

exports.createTag = async (req, res) => {
	const tag_name = req.body.tag_name;

	const tag = new Tag({
		tag_name,
	});

	if (!tag_name) return res.status(422).json({ msg: "o nome é obrigatório!" });

	try {
		await Tag.create(tag);

		res.status(200).json({ msg: "tag criada com sucesso!" });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.getAllTags = async (req, res) => {
	try {
		const tag = await Tag.find();

		res.status(200).json({ tag });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.getAllTagsFromVideo = async (req, res) => {
	const tag = req.params.name;

	console.log(tag);

	try {
		const findTag = await Tag.findOne({ tag_name: tag });

		console.log("teste", findTag);

		const name = await Video.find({ tag: findTag._id }).populate(
			"tag",
			"tag_name"
		);

		if (!name) return res.status(422).json({ msg: "Tag não encontrada!" });

		res.status(200).json({ name });
	} catch (err) {
		console.log(err);

		res.status(500).json({
			msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.updateTag = async (req, res) => {
	const id = req.params.id;

	const tag_name = req.body.tag_name;

	const tag = {
		tag_name,
	};

	try {
		const updatedTag = await Tag.updateOne({ _id: id }, tag);

		if ((await updatedTag.matchedCount) === 0)
			return res.status(404).json({ msg: "Tag não encontrada!" });

		res.status(200).json({ tag });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.deleteTag = async (req, res) => {
	const id = req.params.id;

	try {
		await Tag.deleteOne({ _id: id });

		res.status(200).json({ msg: "tag deletada com sucesso!" });
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde",
		});
	}
};
