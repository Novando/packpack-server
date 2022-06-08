const joi 			= require('joi');
const bcrypt 		= require('bcrypt');
const user 			= require('../models').user;

exports.verifyLogin = async (req, res, next) => {
	try{
		let getUser;
		const schema = joi.string().email();

		const joiResult = schema.validate(req.body.credential);
		if (!joiResult.error) {
			getUser = await user.findOne({
				where:{
					email: req.body.credential
				}
			});
			console.log("Login with email : " + joiResult.value);
		} else {
			getUser = await user.findOne({
				where:{
					username: req.body.credential
				}
			});
			console.log("Login with username : " + joiResult.value);
		};


		if (!getUser) {
			return res.status(404).send({ msg : 'Credential not valid'});
		}
		const match = await bcrypt.compare(req.body.password, getUser.password);
		if (!match) {
			return res.status(400).send({ msg : 'Credential not valid'});
		}
		req.credential = getUser;
		next();
	} catch (err) {
		res.status(400).send({ msg: err})
	}
}
	