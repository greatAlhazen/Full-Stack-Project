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

const http = require('http');

/* // for handling request
const server = http.createServer((req, res) => {
	// config header
	res.writeHead(200, {
		/* 'Content-Type': 'text/plain' */
/* 	'Content-Type': 'application/json'
	}); */

// send data to user
/* res.end(`hello from ${resultWithId[0]} `); */
/* res.end(
		JSON.stringify({
			id: resultWithId[0].id,
			planet: resultWithId[0].planet
		})
	);
});  */

const server = http.createServer();

// event when get request
server.on('request', (req, res) => {
	// handle request according to endpoint
	const url = req.url.split('/');
	// post request
	if (req.method === 'POST' && url[1] === 'planets') {
		req.on('data', (data) => {
			// when data come covert string for log
			const planet = data.toString();
			console.log(planet);
			// JSON parse data for add to array
			resultWithId.push(JSON.parse(planet));
		});
		// readable stream to writable stream
		req.pipe(res);
	} else if (req.method === 'GET' && url[1] === 'planets') {
		// get request
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');

		// parameterized urls
		if (url.length === 3) {
			const urlIndex = +url[2];
			const item = resultWithId[urlIndex];
			res.end(
				JSON.stringify({
					id: item.id,
					planet: item.planet
				})
			);
		} else {
			res.end(
				JSON.stringify({
					resultWithId
				})
			);
		}
	} else if (req.method === 'GET' && url[1] === 'message') {
		// get request
		// send html response
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<body>');
		res.write(`<p>Hello from ${resultWithId[0].planet}</p>`);
		res.write('</body>');
		res.write('</html>');
		res.end();
	}
});

// listen server on specific port
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server listen requests on ${PORT}`);
});
