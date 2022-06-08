const express 					= require('express');
const multer 						= require('multer');
const path 							= require('path');

// Register Middleware
const verifyToken 		 	= require('../middleware/verify_token.js');

// Register route
const userRoute  				= require('./user.js');
const productRoute 			= require('./product.js');
const productCustomRoute= require('./product_custom.js');
const cartRoute 				= require('./cart.js');
const addressRoute			= require('./address.js');
const orderRoute		  	= require('./order.js');
const materialRoute			= require('./material.js');
const rajaongkirRoute		= require('./rajaongkir.js');
const token  						= require('../controllers/refresh_token.js'); 

const route 						= express.Router();

// Token Management
route.get('/reload', token.refreshToken);

// User Route
route.use('/user', userRoute);

// Product route
route.use('/product', productRoute);

// Product Custom route
route.use('/custom', productCustomRoute);

// Cart route
route.use('/cart', cartRoute);

// Address route
route.use('/address', addressRoute);

// Material route
route.use('/material', materialRoute);

// Order route
route.use('/order', orderRoute);

// Rajaongkir route
route.use('/rajaongkir', rajaongkirRoute);

module.exports = route;