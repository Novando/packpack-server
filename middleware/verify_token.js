const jwt 		= require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
	const authHeader 		= req.headers['authorization'];
	const token 				= authHeader && authHeader.split(' ')[1];
	
	if (token == null){
		return res.sendStatus(401);
	};

	jwt.verify(token, process.env.SERVER_ACCESS_SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403);
		};
		req.email = decoded.getEmail;
		next();
	});

};