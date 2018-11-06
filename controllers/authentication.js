const User = require('../models/user');
const jWt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jWt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
	res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) return res.status(422).send({ message: 'You must provide email and password' });
	//check if user exists
	User.findOne({ email: email }, function(err, existingUser) {
		console.log(existingUser);
		if (err) {
			return next(err);
		}
		//return error if user exists
		if (existingUser) {
			return res.status(422).send({ error: 'email is in use' });
		}
		//create new user
		const user = new User({
			email: email,
			password: password
		});
		user.save(function(err) {
			if (err) {
				return next(err);
			}
		});
		//return message
		res.json({ success: true, token: tokenForUser(user) });
	});
};
