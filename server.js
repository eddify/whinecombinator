#!/usr/bin/env node
var twitapi = require('node-twitter-api');


var port = process.env.PORT || 1337;
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log("Listening on port "+port);

