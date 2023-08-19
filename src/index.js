const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const CityRepository = require("./repository/city-repository");

const db = require("./models/index");
// const {Airplane} = require('./models/index');

const setupAndStartServer = async () => {
	// create the express object
	const app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use("/api", ApiRoutes);

	app.listen(3000, async () => {
		console.log(`Server started at ${PORT}`);
		const repo = new CityRepository()
		repo.createCity({name:"jalna"})
		if (process.env.SYNC_DB) {
			db.sequelize.sync({ alter: true });
		}
	});
};

setupAndStartServer();
