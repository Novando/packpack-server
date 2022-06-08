const JwtStrategy 			= require('passport-jwt').Strategy;
const ExtractJwt 				= require('passport-jwt').ExtractJwt;
const user 							= require('../models').user;
const key 							= process.env.SERVER_ACCESS_SECRET;

const opts 					= {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey 		= key;

module.exports = passport => {
	passport.use( 
		new JwtStrategy(
			opts,
			(jwt_payload, done) => {
				user.findOne({
					where:{
						id: jwt_payload.getId
					}
				}).then(user => {
					if(user) {
						return done(null, user);
					};
					return done(null, false);
				}).catch(err => {
					console.log(err);
				});
			}
		)
	)
};