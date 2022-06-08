const express 					= require('express');

// Load controllers
const cart  						= require('../controllers/cart_controller.js');

// Initiate routing
const cartRoute			= express.Router();

// User management
cartRoute.post('/show/user', cart.show);
cartRoute.post('/add', cart.add);

module.exports = cartRoute;