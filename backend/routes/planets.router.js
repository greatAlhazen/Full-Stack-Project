const routerPlanets = require('express').Router();

const controllerPlanets = require('../controllers/planets.controller');

routerPlanets.post('/', controllerPlanets.postPlanet);

routerPlanets.get('/', controllerPlanets.getPlanets);

routerPlanets.get('/:planetId', controllerPlanets.getPlanet);

module.exports = routerPlanets;
