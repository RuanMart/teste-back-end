const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Profile = require("../models/Profile.js");

exports.createUser = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	if (!name)
		return res.status(422).json({
			msg: "o nome é obrigatório",
		});

	if (name.length < 4 || name.length > 16)
		return res.status(422).json({
			msg: "o nome deve conter entre 4 e 16 caracteres",
		});

	if (!email)
		return res.status(422).json({
			msg: "o e-mail é obrigatório!",
		});

	if (!password)
		return res.status(422).json({
			msg: "a senha é obrigatória",
		});

	if (password.length < 6 || password.length > 16)
		return res.status(422).json({
			msg: "a senha deve conter entre 6 e 16 caracteres",
		});

	if (confirmPassword !== password)
		return res.status(422).json({
			msg: "as senhas não coincidem",
		});

	// checando se Profile ja existe

	const profileExists = await Profile.findOne({ email: email });

	if (profileExists)
		return res.status(422).json({ msg: "por favor, ultilize outro e-mail!" });

	// criando senha

	const salt = await bcrypt.genSalt(12);

	const passwordHash = await bcrypt.hash(password, salt);

	// create Profile

	const profile = new Profile({
		name,
		email,
		password: passwordHash,
	});

	try {
		await profile.save();

		res.status(201).json({ msg: "usuário criado com sucesso!" });
	} catch (err) {
		console.log(err);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	const profile = await Profile.findOne({ email: email });

	const checkPassword = await bcrypt.compare(password, profile.password);

	if (!email)
		return res.status(422).json({
			msg: "o e-mail é obrigatório!",
		});

	if (!password)
		return res.status(422).json({
			msg: "a senha é obrigatória!",
		});

	if (!profile) return res.status(404).json({ msg: "Usuário não encontrado" });

	if (!checkPassword) return res.status(422).json({ msg: "Senha incorreta" });

	try {
		const secret = process.env.SECRET;

		const token = jwt.sign(
			{
				id: profile._id,
			},
			secret
		);
		res.status(200).json({ msg: "autenticação realizada com sucesso", token });
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "ocorreu um erro no servidor, tente novamente mais tarde!",
		});
	}
};

exports.getUser = async (req, res) => {
	const id = req.params.id;

	const user = await Profile.findById(id, "-password");

	if (!user) return res.status(404).json({ msg: "usuário não encontrado" });

	res.status(200).json({ user });
};
