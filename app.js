//config
var token = '6UmmrF9HuA5xByLU1Giokjwq';
var mtg_endpoint = 'https://api.magicthegathering.io/v1/cards';

//requires
var express = require('express'),
    https = require('https'),
    request = require('request'),
    bodyParser = require('body-parser');

//application
var app = express();

//initialization
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', (process.env.PORT || 5000));

//routes
app.get('/', function (req, res) {
  res.json({"message": "hi!"});
});

app.post('/lookup', function(req, res) {
    try{
        var name = req.body.text;
        request(mtg_endpoint+'?name='+name, function(err, resp, body){
            try {
                if (!err && resp.statusCode == 200) {
                    var json_body = JSON.parse(body);
                    var card_name = json_body.cards[0].name;
                    var image_url = json_body.cards[0].imageUrl;
                    res.json({
                        "response_type": "in_channel",
                        "text": card_name,
                        "attachments": [
                            {
                                "fallback": card_name,
                                "image_url": image_url
                            }
                        ]
                    }); 
                }
            } catch (ex) {
                console.log(ex);
                res.send("Nothing found :(."); 
            }
        });
    } catch (ex) {
        console.log(ex);
        res.send("Nothing found :(."); 
    }
});


//run
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('slashmtg app listening on %s', port);
});
