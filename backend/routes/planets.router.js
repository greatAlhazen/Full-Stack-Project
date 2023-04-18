const routerPlanets = require('express').Router();

const { getPlanets } = require('../controllers/planets.controller');

routerPlanets.get('/', getPlanets);

module.exports = routerPlanets;
