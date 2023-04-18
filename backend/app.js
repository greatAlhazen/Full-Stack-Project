// create and handle server framework
const express = require('express');
const cors = require('cors');

//initialize app
const app = express();

// import routes
const routerPlanets = require('./routes/planets.router');

// cross-origin-resource-sharing config
app.use(
	cors({
		origin: 'http://localhost:3000'
	})
);

// middleware that parse json object
app.use(express.json());

// planets route middleware
app.use('/planets', routerPlanets);

module.exports = app;
