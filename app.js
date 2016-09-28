//requires
var express = require('express'),
    bodyParser = require('body-parser');

//application
var app = express();

//initialization
app.use(bodyParser.json());

//routes
app.get('/', function (req, res) {
  res.json({"message": "hi!"});
});

