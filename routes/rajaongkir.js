const express 					= require('express');

// Load controllers
const rajaongkir  						= require('../controllers/rajaongkir_controller.js');

// Initiate routing
const rajaongkirRoute			= express.Router();

// User management
rajaongkirRoute.get('/province', rajaongkir.printProvince);
rajaongkirRoute.post('/city', rajaongkir.showCity);
rajaongkirRoute.post('/zip', rajaongkir.setZip);
rajaongkirRoute.post('/cost', rajaongkir.showCost);
// rajaongkirRoute.post('/add', rajaongkir.add);

module.exports = rajaongkirRoute;