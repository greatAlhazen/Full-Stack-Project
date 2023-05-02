const api = require('express').Router();

const routerPlanets = require('./planets.router');
const routerFlights= require('./flights.router');

api.use('/planets',routerPlanets);
api.use('/flights',routerFlights);

module.exports = api;