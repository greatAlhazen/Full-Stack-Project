const { parse } = require('csv-parse');
const fs = require('fs');

let resultsPlanet = [];
let resultWithId = [];

// control habitable planet with some suggestion values
const isHabitable = (planet) => {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
};

// return a readeble stream
fs
	.createReadStream('planets_data.csv')
	.pipe(
		// connect readeble stream to writable stream
		parse({
			// comment block in file
			comment: '#',
			// for return key-value pairs
			columns: true
		})
	)
	.on('data', (data) => {
		// event when data comes in
		if (isHabitable(data)) {
			resultsPlanet.push(data);
		}
	})
	.on('error', (error) => {
		// event when error occured
		console.log(error);
	})
	.on('end', () => {
		// event when stream end
		resultsPlanet.forEach((item, index) => {
			resultWithId.push({ id: index, planet: item['kepler_name'] });
		});
		console.log(`${resultsPlanet.length} planets found`);
	});

// create and handle server framework
const express = require('express');
//initialize app
const app = express();

/* // send text
app.get('/text', (req, res) => {
	res.send('hello from world');
});

// send json
app.get('/json', (req, res) => {
	res.send({
		id: 1,
		planet: 'kepler 469 b'
	});
});

// send html
app.get('/html', (req, res) => {
	res.send('<ul><li>hello</li></ul>');
}); */

// middleware that log method,url and req-res time
app.use((req, res, next) => {
	const reqTime = Date.now();
	next();
	const resTime = Date.now() - reqTime;
	console.log(`${req.method} ${req.url} ${resTime}ms`);
});

// middleware that parse json object
app.use(express.json());

// post request
app.post('/planets', (req, res) => {
	if (!req.body.planet) {
		return res.status(400).json({
			error: 'please add one planet'
		});
	}
	const newPlanet = {
		id: resultWithId.length,
		planet: req.body.planet
	};
	resultWithId.push(newPlanet);
	res.json(newPlanet);
});

// send all data with json
app.get('/planets', (req, res) => {
	res.json(resultWithId);
});

// parameterized url
app.get('/planets/:planetId', (req, res) => {
	const planetId = req.params.planetId;
	const planet = resultWithId[planetId];
	if (planet) {
		res.json(planet);
	} else {
		// send error status and message
		res.status(400).json({ error: 'sorry,it is not found' });
	}
});

app.get('/message', (req, res) => {
	res.send(`<p>hello from ${resultWithId[0].planet}</p>`);
});

// server listen specific port
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`application running on ${PORT}`);
});
