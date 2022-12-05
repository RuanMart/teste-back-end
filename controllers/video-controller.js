const Video = require("../models/Video.js");

const Tag = require("../models/Tags.js");

exports.createVideo = async (req, res) => {
	const { name, URL, tag } = req.body;

	const nameExists = await Video.findOne({ name: name });

	if (!name) return res.status(422).json({ msg: "o nome é obrigatório!" });

	if (!URL) return res.status(422).json({ msg: "a URL é obrigatória!" });

	if (nameExists)
		return res.status(422).json({ msg: "por favor, ultilize outro nome!" });

	const video = new Video({
		name,
		URL,
		tag,
	});

	try {
		video.tag.push(req.body.tag_name);

		await video.save();

		res.status(200).json({
			msg: "vídeo inserido com sucesso no banco de dados!",
		});
	} catch (err) {
		console.log(err);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.getVideos = async (req, res) => {
	try {
		const videos = await Video.find().populate("tag", "tag_name");

		res.status(200).json({ videos });
	} catch (err) {
		console.log(err);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.getVideosById = async (req, res) => {
	const id = req.params.id;

	try {
		const video = await Video.findById({ _id: id }).populate("tag", "tag_name");

		if (!video)
			return res.status(422).json({ message: "usuário não encontrado" });

		res.status(200).json({ video });
	} catch (erro) {
		console.log(erro);

		return res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.updateVideo = async (req, res) => {
	const id = req.params.id;

	const { name, URL, tag } = req.body;

	const video = {
		name,
		URL,
		tag,
	};

	try {
		const updatedVideo = Video.updateOne({ _id: id }, video);

		if ((await updatedVideo).matchedCount === 0)
			return res.status(404).json({ msg: "Vídeo não encontrado!" });

		res.status(200).json({ video });
	} catch (error) {
		console.log(err);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.deleteVideo = async (req, res) => {
	const id = req.params.id;

	const video = await Video.findOne({ _id: id });

	if (!video) return res.status(422).json({ msg: "Vídeo não encontrado" });

	try {
		await Video.deleteOne({ _id: id });

		res.status(200).json({ message: "Usuário removido com sucesso!" });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			msg: "Ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};
