/**
 * Created by viviandiep on 4/26/15.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var renderer = require('./main.js');
var dataPro = require('./dataPro.js');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*');//'http://localhost:*', 'http://localhost', 'http://vivian.media.mit.edu*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
});

//app.get('/',renderer.page);
app.get('/getComments',renderer.getPage);
app.post('/sentiment',dataPro.getSentimental);
//app.post('/getPage',dataPro.getPage);


app.listen(process.env.PORT || 3000, function() {
    console.log(process.env.PORT);
    console.log("listening on 3000");
});