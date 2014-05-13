var express = require('express');
var bodyParser = require('body-parser');
var countries = require('./models/countries.json');

var modified = function(arrayOfObjects){
	arrayOfObjects.map(function(d){
		d['hasTraveled'] = false;
	})
	return arrayOfObjects	
}

var newData = modified(countries);

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/countries', function(req, res) {
	res.send(newData);

})

app.post('/search', function(req,res){
	var searchTerm = req.body.search;

	var match = newData.filter(function(d){
		return d.name === searchTerm;
	})

	res.send(match);
})

app.get('/travel', function(req, res){
	var countryName = req.query.name;
	var hasTraveled = req.query.hasTraveled;
	
	for (var i = 0; i < newData.length; i++){
		if (newData[i]['name'] === countryName){
			newData[i]['hasTraveled'] = hasTraveled;
			return;
		}
	}
	res.send(newData);
})

var server = app.listen(7164, function() {
	console.log('Express server listening on port ' + server.address().port);
});
