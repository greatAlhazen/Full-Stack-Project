const { planets } = require('../model/planets.model');

function getPlanets(req, res) {
	res.json(planets);
}

module.exports = {
	getPlanets
};
