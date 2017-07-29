var _ = require('underscore');
var TwitchApi = require('twitch-api');

// Values provided by dev.twitch.tv
var twitch = new TwitchApi({
	clientId: 'INSERT ID',
  clientSecret: 'INSERT SECRET',
  redirectUri: 'http://localhost',
  scopes: []
});

/* 
		Provides top games, search channels, search games, search streams data
 */
module.exports = function(app) {
	
    app.get('/twitch/gettopgames', function(req, res) {
		
			var arr = [];
				twitch.getTopGames(function(err, twitch) {
				_.each(twitch.top, function(item) {
					arr.push(item.game);
				});
				res.header("Access-Control-Allow-Origin", "*");
				res.send(arr);
			});
    });

    app.get('/twitch/searchforgames/:query', function(req, res) {
    	
			var params = {
				query: req.params.query,
				type: "suggest" 
			}
			var arr = [];
			twitch.searchGames(params, function(err, twitch) {
				_.each(twitch.games, function(item) {
					arr.push(item);
				});
				res.header("Access-Control-Allow-Origin", "*");
				res.send(arr);
			});
    });

    app.get('/twitch/searchforchannels/:query', function(req, res) {

			var params = {
				query: req.params.query
			}
			var arr = [];
			twitch.searchChannels(params, function(err, twitch) {
				_.each(twitch.channels, function(item) {
					arr.push(item);
				});
				res.header("Access-Control-Allow-Origin", "*");
				res.send(arr);
			});
    });

    app.get('/twitch/searchforstreams/:query', function(req, res) {

			var params = {
				query: req.params.query
			}
			var arr = [];
			twitch.searchStreams(params, function(err, twitch) {
				_.each(twitch.streams, function(item) {
					arr.push(item);
				});
				res.header("Access-Control-Allow-Origin", "*");
				res.send(arr);
			});
    });
}
