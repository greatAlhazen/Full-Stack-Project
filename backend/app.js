// create and handle server framework
const express = require('express');
//initialize app
const app = express();

// import routes
const routerPlanets = require('./routes/planets.router');
const routerMessages = require('./routes/messages.router');

// middleware that log method,url and req-res time
app.use((req, res, next) => {
	const reqTime = Date.now();
	next();
	const resTime = Date.now() - reqTime;
	console.log(`${req.method} ${req.url} ${resTime}ms`);
});

// middleware that parse json object
app.use(express.json());

// planets route middleware
app.use('/planets', routerPlanets);

// messages route middleware
app.use('/messages', routerMessages);

// server listen specific port
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`application running on ${PORT}`);
});
