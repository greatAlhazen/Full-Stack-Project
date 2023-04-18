const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

let planets = [];

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
function loadData() {
	new Promise((resolve, reject) => {
		fs
			.createReadStream(path.join(__dirname, '..', 'data', 'planets_data.csv'))
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
					planets.push(data);
				}
			})
			.on('error', (error) => {
				// event when error occured
				console.log(error);
				reject(error);
			})
			.on('end', () => {
				// event when stream end
				console.log(`${planets.length} planets found`);
				resolve();
			});
	});
}

module.exports = {
	loadData,
	planets
};
