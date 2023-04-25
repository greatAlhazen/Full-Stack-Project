/* // create and handle server framework
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

//initialize app
const app = express();

// import routes
const routerPlanets = require('./routes/planets.router');
const routerFlights= require('./routes/flights.router');

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

// planets route middleware
app.use('/planets',routerPlanets);

// flights route middleware
app.use('/flights',routerFlights);

// serving website
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
 */

const {
	Worker, isMainThread, workerData,
  } = require('worker_threads');

if(isMainThread){
	// if main thread is true run two worker thread
	new Worker(__filename,{
		workerData: [2,6,9,8,5]
	});
	new Worker(__filename,{
		workerData: [1,5,7,3,4]
	});
}else{
	// difference between process workers run same process
	console.log(`In the worker thread ${process.pid}`);
	// sort operation will run different thread and data
	console.log(`${workerData.sort()}`)
}

