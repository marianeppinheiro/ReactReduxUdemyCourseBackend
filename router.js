const Authentication = require('./controllers/authentication');
module.exports = function(app) {
	app.post('/signup', Authentication.signup);
	// app.get('/test1', function(req, res, next) {
	// 	console.log('boo');
	// 	res.send([ 'bla', 'cactus', 'tv' ]);
	// });
};
