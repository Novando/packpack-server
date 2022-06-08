const express 					= require('express');

// Load controllers
const address  						= require('../controllers/address_controller.js');

// Initiate routing
const addressRoute			= express.Router();

// User management
addressRoute.get('/:id', address.print);
addressRoute.post('/add', address.add);
addressRoute.get('/show/:id', address.show);

module.exports = addressRoute;