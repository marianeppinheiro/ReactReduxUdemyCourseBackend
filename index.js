var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var http = require('http');
var router = require('./router.js');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });

var port = process.env.PORT || 8000;

var server = http.createServer(app);
server.listen(port);
console.log(`We are on port: ${port}`);

app.use(morgan('combined')); // Morgan is a logging middleware
app.use(bodyParser.json({ type: '*/*' }));

router(app);
// require("dotenv").config();

// var db = require('./config');
// mongoose.connect(db.url, { useNewUrlParser: true }).catch((err) => {
// 	console.log('Fatal error: ' + err);
// });

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// 	next();
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
