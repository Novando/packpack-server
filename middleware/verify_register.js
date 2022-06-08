const user 			= require('../models').user;
const joi 			= require('joi');

exports.verifyRegister = async (req, res, next) => {
	try{
		let getUser = req.body;
		getUser.username.toLowerCase();
		getUser.email.toLowerCase();

		const schema = joi.object({
			email: joi.string().email(),
			username: joi.string().alphanum(),
			password: joi.string().min(8).max(64),
			confirm: joi.string().min(8).max(64),
		})

		if (getUser.password != getUser.confirm) {
			return res.status(400).send({
				msg: "Password not match"
			});
		};

		const joiResult = schema.validate(getUser);
		if (joiResult.error) {
			switch (joiResult.error.details[0].context.key){
				case 'email':
					return res.status(400).send({
						msg: 'Email invalid'
					});

				case 'username':
					return res.status(400).send({
						msg: 'Username invalid'
					});
					
				case 'password':
					return res.status(400).send({
						msg: 'Password must be 8-64 character long'
					});
				
				default:
					return res.status(400).send({
						msg: 'Registration inforation invalid'
					})
			}
		}
		
		const checkEmail = await user.findOne({
			where:{
				email: getUser.email
			}
		});

		const checkUsername = await user.findOne({
			where:{
				username: getUser.username
			}
		});

		if (checkEmail) {
			return res.status(400).send({
				msg: getUser.email + ' already registered'
			})
		};

		if (checkUsername) {
			return res.status(400).send({
				msg: 'Username already taken'
			})
		};
		
		req.getUser = getUser;
		next();
	} catch(err) {
		console.log(err);
	}
}