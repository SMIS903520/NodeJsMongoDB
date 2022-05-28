var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send("Banco Infinity");

});

app.route('/test').get(function(req, res){
    res.send("pagina inicial")
});

var server = app.listen(3000, function(){})