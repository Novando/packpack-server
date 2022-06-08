const express 					= require('express');
const multer 						= require('multer');
const path 							= require('path');

//Load Controllers
const productCustom 		= require('../controllers/product_custom_controller.js');

const productCustomRoute= express.Router();

//Initiate Multer
const storageProductCustom 		= multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads')
},
	filename: function(req, file, cb) {
		let fileName 	= req.body.userId +
                    '-' + Date.now() +
                    '-' + Math.round(Math.random() * 999);

		cb(null, fileName + path.extname(file.originalname));
	}
});
const uploadProductCustom = multer({ storage: storageProductCustom});

//Product management
productCustomRoute.get('/', productCustom.print);
productCustomRoute.post('/add', uploadProductCustom.fields([
	{ name: 'designFiles' }
]), productCustom.add);
productCustomRoute.post('/edit/:id', productCustom.edit);
productCustomRoute.get('/show/:id', productCustom.show);
productCustomRoute.post('/show/user-id', productCustom.checkId);
productCustomRoute.delete('/remove/:id', productCustom.remove);

module.exports = productCustomRoute;