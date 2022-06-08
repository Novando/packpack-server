const express 			= require('express');
const path 					= require('path');
const session 			= require('express-session');
const bodyParser 		= require('body-parser');
const cookieParser	= require('cookie-parser');
const cors 					= require('cors');
const passport 	= require('passport');

//Initiate ExpressJS
const app 					= express();

app.use(express.static('public'));

//Initiate Server
const PORT      = process.env.SERVER_PORT
const appHost		= process.env.SERVER_HOST + ':' + PORT;
//Register route files
const Route 		= require('./routes/index.js');

//Set middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors());

// Passport middleware
app.use(passport.initialize());

// Bring Passport-Jwt Strategy
require('./config/passport')(passport);


//Initiate Routing
app.use('/api', Route);

// app.get('*', function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/views/frontend/index.html'));
// });


//Port listening log
app.listen(PORT, function() {
	console.log("Listening to " + appHost)
});