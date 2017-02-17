var express = require('express');
var app = express();
var path = require("path");


app.get('/', function( req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function( req, res) {

    res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/resume', function( req, res) {

    res.sendFile(path.join(__dirname + '/resume.html'));
});

app.get('/portfolio', function( req, res) {

    res.sendFile(path.join(__dirname + '/portfolio.html'));
});

 // PORTFOLIO PROJECTS
    app.get('/project1', function( req, res) {

        res.sendFile(path.join(__dirname + '/project1.html'));
    });

    app.get('/project2', function( req, res) {

        res.sendFile(path.join(__dirname + '/project2.html'));
    });

 // END PORTFOLIO PROJECTS

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});