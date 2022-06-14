const express 					= require('express');

// Load controllers
const cart  						= require('../controllers/cart_controller.js');

// Initiate routing
const cartRoute			= express.Router();

// User management
cartRoute.get('/', cart.show);
cartRoute.post('/show/user', cart.showUser);
cartRoute.post('/add', cart.add);
cartRoute.delete('/remove/:id', cart.remove);

module.exports = cartRoute;