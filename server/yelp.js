var keys = require('./keys/apiKeys.js');
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('underscore');


var yelp_request = function(location, callback){
  var httpMethod = 'GET';
  var yelpApiUrl = 'http://api.yelp.com/v2/search';
  var consumerSecret = keys.yelp.ConsumerSecret;
  var tokenSecret = keys.yelp.TokenSecret;

  var required_parameters = {
    oauth_consumer_key : keys.yelp.ConsumerKey,
    oauth_token : keys.yelp.Token,
    oauth_nonce : n(),
    oauth_timestamp : n().toString().substr(0,10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0',
    limit: 15
  };

  var parameters = {ll: location, radius_filter: 500, term: 'food open now'};
  _.assign(parameters, required_parameters);
  console.log("wat are yoouuuu", parameters.ll);
  var signature = oauthSignature.generate(httpMethod, yelpApiUrl, parameters, consumerSecret, tokenSecret, { encodeSignature: false});
  parameters.oauth_signature = signature;
  var parameterURL = qs.stringify(parameters);
  var queryUrl = yelpApiUrl + '?' + parameterURL;

  request(queryUrl, function(error, response, body){
    console.log(queryUrl);
    return callback(error, response, body);
  });

};

module.exports = yelp_request;
