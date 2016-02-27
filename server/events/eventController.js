var Event = require('./eventModel.js');
var Q = require('q');
var http = require('http');
var request = require('request');

var findEvent = Q.nbind(Event.findOne, Event);

module.exports = {
  getEvents: function(req, res, next) {
    findEvent({
      location: req.params.location,
      date: req.params.date,
    })
    .then(function(doc){
      if (doc) {
        console.log("DOC ------> ", doc);
        res.json(doc);
      } else {
        eventfulRequest(); //TODO invoke API call
      }
    });
  },

  addEvents: function(req, res, next) {

  }

};
