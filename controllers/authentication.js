const User = require('../models/user');
exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;
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
		res.json({ success: true });
	});
};
