const express 					= require('express');

// Load controllers
const order					= require('../controllers/order_controller.js');
const orderDetail		= require('../controllers/order_detail_controller.js');

// Initiate routing
const orderRoute			= express.Router();

// Order management
orderRoute.get('/', order.print);
orderRoute.post('/add', order.add, orderDetail.add);

module.exports = orderRoute;