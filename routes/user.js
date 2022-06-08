const express 					= require('express');
const multer 						= require('multer');
const passport					= require('passport');
const path 							= require('path');

// Load controllers
const user  						= require('../controllers/user_controller.js');

// Load middleware
const verifyRegister	 	= require('../middleware/verify_register.js');
const verifyLogin	 	= require('../middleware/verify_login.js');

// Initiate routing
const userRoute			= express.Router();

// User management
userRoute.get('/', user.print);
userRoute.post('/register', verifyRegister.verifyRegister, user.register);
userRoute.post('/login', verifyLogin.verifyLogin, user.login);
userRoute.post('/refresh', user.refresh);
userRoute.post('/edit/:id', user.edit);
userRoute.get('/show/:id', user.show);
userRoute.delete('/remove/:id', user.remove);
userRoute.delete('/logout', user.logout);
// userRoute.get('/test', passport.authenticate('jwt', {session: false}), user.test);

module.exports = userRoute;