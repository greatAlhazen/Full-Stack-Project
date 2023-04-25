const http = require('http');
require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');
const { loadData } = require('./model/planets.model');

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const MONGO_DB_URL = process.env.MONGO_URL;

// if connection opened or error occured
mongoose.connection.once('open',() => {
	console.log('Connection opened');
});

mongoose.connection.on('error',(err) => {
	console.log(`Error is: ${err}`)
})

// before restart server load valueable data
async function serverStart() {
	// mongodb connection with mongoose
	await mongoose.connect(MONGO_DB_URL);
	await loadData();

	server.listen(PORT, () => {
		console.log(`application running on ${PORT}`);
	});
}

serverStart();
