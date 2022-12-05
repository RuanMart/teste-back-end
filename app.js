require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const userRoutes = require("./routes/users.js");

const videoRoutes = require("./routes/video.js");

const tagsRoutes = require("./routes/tags.js");

const DB_USER = process.env.DB_USER;

const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/videos", videoRoutes);

app.use("/tags", tagsRoutes);

mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@teste-back-end.e8xoyju.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(3333, (req, res) => {
			console.log("server e data base rodando");
		});
	})
	.catch((err) => console.log(err));
