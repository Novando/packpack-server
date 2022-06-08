const express 					= require('express');
const multer 						= require('multer');
const path 							= require('path');

//Load Controllers
const product 					= require('../controllers/product_controller.js');

const productRoute			= express.Router();

//Initiate Multer
const storageProduct 		= multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads')
},
	filename: function(req, file, cb) {
		let fileName 	= Date.now() + '-' + Math.round(Math.random() * 999);
		cb(null, fileName + path.extname(file.originalname));
	}
});
const uploadProduct = multer({ storage: storageProduct});

//Product management
productRoute.get('/', product.print);
productRoute.post('/add', uploadProduct.fields([
	{ name: 'mainImg' },
	{ name: 'mockupImgs' }, 
	{ name: 'designFiles' }
]), product.add);
productRoute.post('/edit/:id', product.edit);
productRoute.get('/show/:id', product.show);
productRoute.delete('/remove/:id', product.remove);

module.exports = productRoute;