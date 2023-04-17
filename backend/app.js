// create and handle server framework
const express = require('express');
//initialize app
const app = express();

const path = require('path');

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

/* // serving static site relative path
app.use('/static', express.static('public')); */

// serving static site absolute path
app.use('/static', express.static(path.join(__dirname, 'public')));

// set the template engine for views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// render template engine file
app.get('/view', (req, res) => {
	// first is file,second is value sent
	res.render('app', {
		message: 'hello from template engine'
	});
});

// planets route middleware
app.use('/planets', routerPlanets);

// messages route middleware
app.use('/messages', routerMessages);

// server listen specific port
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`application running on ${PORT}`);
});
