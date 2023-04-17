const routerMessages = require('express').Router();

const controllerMessages = require('../controllers/messages.controller');

routerMessages.get('/', controllerMessages.getMessage);

routerMessages.get('/file', controllerMessages.sendFile);

module.exports = routerMessages;
