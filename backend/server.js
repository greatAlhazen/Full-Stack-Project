const http = require('http');
require('dotenv').config();
const {mongoConnection} = require('./config/mongoDB.config');

const app = require('./app');
const { loadData } = require('./model/planets.model');
const { loadSpaceXApi } = require('./model/flights.model');

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);


// before restart server load valueable data
async function serverStart() {
	await mongoConnection();
	await loadSpaceXApi();
	
	await loadData();

	server.listen(PORT, () => {
		console.log(`application running on ${PORT}`);
	});
}

serverStart();
