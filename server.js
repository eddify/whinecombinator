#!/usr/bin/env node

var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'OzYo9yVsdPCjmdJioWh3Qw',
    consumerSecret: 'PkBLWSKtg8gli0qOIDAjJuvxeZ6M8SjzcYXMlPwxf4',
    callback: 'http://yoururl.tld/something'
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var util = require('util');

function getTweets(callback) {

	twitter.search( {
	        q: "#myboyfriendleftme OR #ihatewhen OR #askmeificare OR #shitty OR #sucks OR #notcool OR #wanttocry OR #mylifesucks OR #idonecare OR #myfriendisabastard OR #mygirlfriendisabitch",
	        count: 100,
	        result_type: 'mixed'
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
	        	console.log(data)
	         	for(var i in tweets) {
	         		var text = tweets[i].text;
	         		var user = tweets[i].user.screen_name;
	         		var id = tweets[i].id;
	         		arr.push({
	         			username: user,
	         			tweet: text,
	         			_id: id,
	         			id: id,
	         			score: 0
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

var Tweet = mongoose.model('Tweet', { username: String, tweet: String, score: Number, _id: Number, id: Number });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('mongo connected');
	//setInterval(function() {

		getTweets(function(tweets) {
			for(var i in tweets) {
				var tweet = new Tweet(tweets[i]);
				tweet.save(tweet, function(err) {
					if(err){
						console.error('error saving tweet: ' + util.inspect(err));
						return;
					}
				});
			}
		})
	//},10000)
});

app.get('/whines/:id/upvote', function(req,res) {
	Tweet.findById(req.params.id, function(err, tweet) {
		if(err)
		{
			console.error('error getting upvote: ' + req.params.id)
			res.status(404).send('resource not found')
			return;

		}
		tweet.score += 1;
		tweet.save(function(err, data) {
			if(err)
			{
				console.error('error saving upvote: ' + req.params.id)
				res.status(500).send('error saving')
			}
			console.log('successfully saved upvote')
			res.json({success: true})
		})


	})
})

app.get('/whines', function(req, res) {
	Tweet
		.find()
		.sort('-score')
		.exec(function(err, data) {
			res.json(data)
		})
})

