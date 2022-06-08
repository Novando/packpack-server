const user 				= require('../models').user;
const jwt 				= require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
	try{
		const newToken = req.cookies.refreshToken;
		if (!newToken) {
			return res.sendStatus(403);
		}

		const getUser = await user.findOne({
			where:{
				token: newToken
			}
		});

		if (!getUser) {
			return res.sendStatus(403);
		}

		jwt.verify(newToken, process.env.REFRESH_SECRET, (err, decoded) => {
			if (err) {
				return res.sendStatus(401);
			};
			const getId 				= getUser.id;
			const getUsername		= getUser.username;
			const getEmail			= getUser.email;
			const accessToken		= jwt.sign(
															{getId, getUsername, getEmail},
															process.env.SERVER_ACCESS_SECRET,
															{ expiresIn: '15s' }
														);
			res.json({ accessToken });
		});
	} catch(err) {
		console.log(err);
	}
}