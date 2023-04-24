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

const express = require('express');
const cluster = require('cluster');
const os = require('os');
const app = express();

// block request
const loop = (time) => {
	const startTime = Date.now();
	while(Date.now() - startTime < time){
	}
}


app.get('/',(req,res) => {
	res.send(`My process id is ${process.pid}`);
});

// counter block time route
app.get('/counter',(req,res) => {
	loop(9000);
	res.send(`My process id is ${process.pid}`);
});

// this executes 3 times, one in master, the two in worker 
console.log('I execute three times')

if(cluster.isMaster){
	// run worker nodes equavilent to computer logical or physical cores
	const NUM_PROCESS = os.cpus().length
	for(let i=0; i<NUM_PROCESS; i++){
		cluster.fork();
	}
	console.log('Master process');
	/* // if master process is true run two worker process
	cluster.fork();
	cluster.fork(); */
}else{
	console.log('Worker process');
	// server listen after worker processes
	app.listen(3000,() => {
		console.log('server listen...')
	});
}

