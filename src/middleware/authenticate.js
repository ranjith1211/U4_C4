const { reject } = require('bcrypt/promises');
var jwt = require('jsonwebtoken');

require('dotenv').config();

const authenticate = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).send('authorization token not found');
	}

	if (!req.headers.authorization.startsWith('Bearer ')) {
		return res.status(401).send('authorization token not found');
	}

	const token = req.headers.authorization.split(' ')[1];

	let decoded;
	try {
		decoded = await verifyToken(token);
	} catch (error) {
		return res.status(401).send('authorization token not found');
	}

	req.user = decoded.user;

	return next();
};

const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		var decoded=jwt.verify(token, process.env.key, function (err, decoded) {
			 if(err){
                 reject(err)
             }
             return resolve(decoded)
		});
	});
};


module.exports=authenticate