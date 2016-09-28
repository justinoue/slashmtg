//config
var token = '6UmmrF9HuA5xByLU1Giokjwq';

//requires
var express = require('express'),
    bodyParser = require('body-parser');

//application
var app = express();

//initialization
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

//routes
app.get('/', function (req, res) {
  res.json({"message": "hi!"});
});


//run
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('slashmtg app listening on %s', port);
});
