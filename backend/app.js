// create and handle server framework
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

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

// logging middleware
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

// serving website
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// planets route middleware
app.use('/planets', routerPlanets);

module.exports = app;
