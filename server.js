#!/usr/bin/env node

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'OzYo9yVsdPCjmdJioWh3Qw',
    consumerSecret: 'PkBLWSKtg8gli0qOIDAjJuvxeZ6M8SjzcYXMlPwxf4',
    callback: 'http://yoururl.tld/something'
});

var util = require('util');

function getTweets(callback) {

	twitter.search( {
	        q: "#myboyfriendleftme OR #ihatewhen OR #askmeificare OR #shitty OR #sucks OR #notcool OR #wanttocry OR #mylifesucks OR #idonecare OR #myfriendisabastard OR #mygirlfriendisabitch"
	    },
	    '918354384-tYmdVh1EXzXjVerRJMizn01Bg19XozBbHbiOi69q',
	    'IY9jOT1GIrCeChJbfv8htt0aoM4N5DCcljjlRIR76g',
	    function(error, data, response) {
	        if (error) {
	        	console.error(error)
	            // something went wrong
	        } else {
	        	var arr = [];
	        	var tweets = data.statuses;
	         	for(var i in tweets) {
	         		var text = tweets[i].text;
	         		var user = tweets[i].user.screen_name;
	         		arr.push({
	         			username: user,
	         			tweet: text
	         		})
	         	}

	         	callback(arr);
	        }
	    }
	);
}

var tweetList = [];
var port = process.env.PORT || 1337;
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log("Listening on port "+port);

setInterval(function() {
	getTweets(function(tweets) {
		tweetList = tweets;
	})
}, 5000)

app.get('/whines', function(req, res) {
	res.json(tweetList)
})