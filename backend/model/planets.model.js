const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const Planets = require('./planets.mongo');

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
			.on('data',async (data) => {
				// event when data comes in
				if (isHabitable(data)) {
					addPlanet(data)
			}
			})
			.on('error', (error) => {
				// event when error occured
				console.log(error);
				reject(error);
			})
			.on('end', async() => {
				// event when stream end
				const foundPlanet = (await getAllPlanets()).length;
				console.log(`${foundPlanet} found`);
				resolve();
			});
	});
}

// find data in mongodb database
async function getAllPlanets() {
	return await Planets.find({},{
		'_id':0,
		'__v':0
	});
};

// data added mongodb database
async function addPlanet(planets){
	try{
		await Planets.updateOne({
			keplerName:planets.kepler_name
		},{
			keplerName:planets.kepler_name
		},{
			upsert:true,
		})
	}catch(err){
		console.log(`something went wrong ${err}`)
	}
}


module.exports = {
	loadData,
	getAllPlanets
};
