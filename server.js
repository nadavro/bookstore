var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var books = require('./routes/books');
const path = require('path');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nadavrozen:nadavrozen@ds147668.mlab.com:47668/books')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/books', books);
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
  console.log("Magic happens on port", app.get('port'));
});
