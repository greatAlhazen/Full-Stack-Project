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
	});

module.exports = {
	resultsPlanet,
	resultWithId
};
