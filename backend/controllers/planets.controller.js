const modelPlanet = require('../model/planets.model');

const resultWithId = modelPlanet.resultWithId;

function getPlanets(req, res) {
	res.json(resultWithId);
}

function getPlanet(req, res) {
	const planetId = req.params.planetId;
	const planet = resultWithId[planetId];
	if (planet) {
		res.json(planet);
	} else {
		// send error status and message
		res.status(400).json({ error: 'sorry,it is not found' });
	}
}

function postPlanet(req, res) {
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
}

module.exports = {
	getPlanets,
	getPlanet,
	postPlanet
};
