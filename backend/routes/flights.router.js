const routerFlights = require('express').Router();
const {getFlights, addFlight, deleteFlight} = require('../controllers/flights.controller');


routerFlights.route('/').get(getFlights).post(addFlight);
routerFlights.delete('/:id',deleteFlight);

module.exports = routerFlights;