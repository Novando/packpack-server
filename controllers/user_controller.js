const user 			= require('../models').user;
const fs 				= require('fs');
const ipify			= require('ipify2');
const bcrypt 		= require('bcrypt');
const jwt				= require('jsonwebtoken');
const joi 			= require('joi');
const passport 	= require('passport');


exports.print = async (req, res) => {
  try{
    let result = await user.findAll({
    	attributes: {
    		exclude: [
					'password',
					'token'
				]
			},
    });
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

exports.register = async(req, res) => {
  try{
		let getUser = req.getUser;
		
		salt 		= await bcrypt.genSalt();
		hashed 	= await bcrypt.hash(getUser.password, salt);
  	let ip = await ipify.ipv4();
    await user.create({
    	email			: getUser.email,
    	username	: getUser.username,
    	password	: hashed,
    	createdBy	: ip,
    	modifiedBy: ip
    });
    res.status(201).send({ msg: getUser.email + ' has been created as Member!' });
  } catch(err) {
    res.status(400).send(err);
  };
};

exports.login = async(req, res) => {
	try{
		let getUser 			= req.credential;
		let getId		 			= getUser.id;
		let getRole 			= getUser.role;
		let getUsername		= getUser.username;
		const accessToken = jwt.sign(
													{getRole, getId, getUsername},
													process.env.SERVER_ACCESS_SECRET,
													{ expiresIn: '1d' }
												);
		await user.update({ token: accessToken}, {
			where:{
				id: getId
			}
		});
		res.status(200).json({
			id 				: getId,
			user 			: getUsername,
			success 	: true,
			token 		: accessToken,
			msg 			: 'You are logged in' 
		});
		// const refreshToken	= jwt.sign(
		// 												{getRole, getUsername, getEmail},
		// 												process.env.REFRESH_SECRET,
		// 												{ expiresIn: '1d' }
		// 											);
		// res.cookie('refreshToken', refreshToken, {
		// 	httpOnly	: true,
		// 	maxAge 		: 24 * 60 * 60 * 1000,
		// });
		// res.status(200).json({ getRole, getUsername, getEmail });
		console.log('sampe sini');

	} catch(err) {
		res.status(400).send(err)
	}
};

exports.refresh = async (req, res) => {
	if ((req.body.token).split(' ')[0] != 'Bearer') {
		return res.status(403).json({
			user 				: null,
			msg 				: 'Token invalid',
			authorized	: false
		});
	}

	const accessToken = (req.body.token).split(' ')[1];
	try{
		const user = await user.findOne({
			where: {
				token: accessToken
			}
		});

		if (!user) {
			return res.status(401).json({
				user 				: null,
				msg 				: 'Token invalid',
				authorized 	: false
			});
		}

		return res.status(202).json({
			user 				: user,
			authorized 	: true
		});
	} catch(err) {
		console.log(err);
	}
}

exports.logout = async(req, res) => {
	const newToken = req.cookies.refreshToken;
	if (!newToken) {
		return res.Status(204).send('No token');
	};

	const getUser = await user.findOne({
		where:{
			token: newToken
		}
	});

	if (!getUser) {
		return res.status(204).send('No User');
	}

	await user.update({ token: null}, {
		where:{
			id: getUser.id,
		}
	});

	res.clearCookie('refreshToken');
	return res.sendStatus(200);
	console.log(getUser);
};

exports.remove = async(req, res) => {
	await user.destroy({
		where:{
			id: req.params.id,
		}
	});;
	return res.sendStatus(200);
};

exports.edit = async(req, res) => {
	try{
		let ip = await ipify.ipv4()
		await user.update(
			{
				email: req.body.email,
				role: req.body.role,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				modifiedBy: ip,
				updateAt: Date.now()
			}, {
				where:{
					id: req.params.id
				}
			}
		);
		let password = req.body.password;
		console.log('password = ' + password);

		if (password == '' || password == ' '){
			password = null;
		}

		if (password != null){
			if (password != req.body.confirm){
				return res.status(400).send({ msg: 'Password not match'});
			} else {
				salt 		= await bcrypt.genSalt();
				hashed 	= await bcrypt.hash(password, salt);
				await user.update(
					{
						password: hashed
					}, {
						where:{
							id: req.params.id
						}
					}
				);
				console.log('Password changed');
			};
		};

		console.log('User updated');
		return res.sendStatus(200);
	} catch(err) {
		console.log(err);
		return res.status(400).send({ msg: err });
	}
};

exports.show = async (req, res) => {
	console.log('seeking userID ' + req.params.id);
  try{
    let result = await user.findOne({
    	attributes: {
    		exclude: [
					'password',
					'token'
				]
			},
    }, {
    	where:{
    		id: req.params.id
    	}
    });
    res.json(result);
  } catch(err) {
    res.json(err);
  };
};

// exports.test = async (req, res) => {
// 	try{
// 		res.json(req.user);
// 	} catch(err) {
// 		res.json(err);
// 	}
// }