var Event = require('./eventModel.js');
var Q = require('q');
var key = require('../keys/apikeys.js')

var eventful = require('eventful-node');
var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);
var client = new eventful.Client(key.eventful);

// This function is for optimization to allow auto-refreshing of event listings
// var updateEvent= Q.nbind(Event.update, Event);

module.exports = {
  // Queries DB for event document, if not found, queries eventful API
  getEvents: function(req, res, next) {
    //console.log("REQ OBJECT-----------------------------: ",req);
    console.log("req.query OBJECT-----------------------------: ",req.query);
    findEvent({
      location: req.query.location,
      date: req.query.date,
    })
    .then(function(doc){
      console.log("DOC ---------------------> ", doc);
      if (doc) {
        "RESULT COMING FROM DATABASE";
        res.json(doc);
      } else {
        console.log("ABOUT TO ENTER EVENTFUL API SEARCH");
        client.searchEvents(req.query,
          function(err, data){
            // console.log("NOW INSIDE EVENTFUL API SEARCH");
            if (err) {
              console.error("Error received in client searchEvents:", err);
            } else {
              if (data) {
                console.log("RETURNED DATA FROM EVENTFUL IS:", data);
                // data received from eventful API, return data to map, then store in db
                createEvent({
                  location: req.query.location,
                  date: req.query.date,
                  eventList: data.search.events.event,
                  // uses $currentDate to pull date and sets value of lastModified column
                  $currentDate: {
                    lastModified: true,
                  },
                }, function (err, list){
                  if (err){
                    console.log("ERROR: ", err);
                  } else {
                    console.log('added list length is ', list.length);
                  }
                });
                res.send(data); // Is this JSON?
                res.end(); // Do we need to send anything in the res.end?
              }
            }
        });
      }
    });
  }
};
