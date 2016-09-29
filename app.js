//config
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

//functions
function arandom(max){
    return Math.floor(Math.random()*max)
}

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
                    var card_name = json_body.cards[json_body.cards.length - 1].name;
                    var image_url = json_body.cards[json_body.cards.length - 1].imageUrl;
                    res.json({
                        "response_type": "in_channel",
                        "text": image_url
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

app.post('/src', function(req, res){
    var paths = [
        'chromeover',
        'src',
        'browser',
        'src',
        'chrome',
        'browser',
        'chromeos',
        'usr',
        'lib',
        'etc',
        'libs',
        'google',
        'data',
        'chromiumos',
        'project',
    ];
    var path = [''];
    for(var i=0; i < 5 + arandom(10); i++){
        path.push(paths[arandom(paths.length)]);
    }

    res.json({
        "response_type": "in_channel",
        "text": path.join('/')
    });
});


//run
var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('slashmtg app listening on %s', port);
});
