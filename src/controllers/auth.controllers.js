const User = require('../models/user.model');

var jwt = require('jsonwebtoken');

require('dotenv').config();

function newToken(user){
    return jwt.sign({ user }, process.env.key);
}

const register = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			return res.status(400).send('email is already exists');
		}

		user = await User.create(req.body);

        const token = newToken(user)

		return res.status(201).send({user,token});
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email })

		if (!user) {
			return res.status(400).send('incorrect email or password');
		}

	    let match = await user.checkPassword(req.body.password);

        if(!match){
            return res.status(400).send('incorrect email or password')
        }
        
        const token = newToken(user)
		return res.status(201).send({user,token});
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

module.exports = { register, login };
