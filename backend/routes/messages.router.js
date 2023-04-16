const routerMessages = require('express').Router();

const controllerMessages = require('../controllers/messages.controller');

routerMessages.get('/', controllerMessages.getMessage);

module.exports = routerMessages;
