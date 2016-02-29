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
    console.log("req.query OBJECT-----------------------------: ",req.query);
    Event.findOne({
      dateAndPlace: req.query.date+req.query.where,
    })
    .then(function(doc){
      // console.log("DOC ---------------------> ", doc);
      if (doc) {
        console.log("RESULT COMING FROM DATABASE");
        res.json(doc.eventList);
      } else {
        console.log("ABOUT TO ENTER EVENTFUL API SEARCH");
        client.searchEvents(req.query,
          function(err, data){
            // console.log("NOW INSIDE EVENTFUL API SEARCH");
            if (err) {
              console.error("Error received in client searchEvents:", err);
            } else {
              if (data) {
                console.log("RETURNED DATA FROM EVENTFUL");
                // data received from eventful API, return data to map, then store in db
                  // uses $currentDate to pull date and sets value of lastModified column
                  // $currentDate: {
                  //   lastModified: true,
                  // },
                var eventList = data.search.events.event;
                for(var i = 0; i < eventList.length || 0; i++){
                  if(eventList[i].description) {
                    eventList[i].description = eventList[i].description.slice(0, 500) + '...';
                  }
                  // var used = ['title', 'latitude', 'longitude'];
                  var used = ['title', 'venue_name', 'venue_address', 'city_name', 'region_abbr', 'url', 'latitude', 'longitude', 'description'];
                  for(var prop in eventList[i]) {
                    // console.log('prop name is ', prop);
                    if(used.indexOf(prop) === -1){
                      // console.log('deleting prop');
                      delete eventList[i][prop];
                      // console.log('list of properties is ', Object.getOwnPropertyNames(eventList[i]));
                    }
                  }
                }

                // console.log('event array is ', eventList);
                // console.log('EVENTLIST IS ------->', eventList);
                Event.create({
                  dateAndPlace: req.query.date+req.query.where,
                  eventList: eventList,
                }, function (err, list){
                  if (err){
                    console.log("ERROR: ", err);
                  } else {
                    console.log('LIST ADDED');
                  }
                res.send(data.search.events.event); // Is this JSON?
                res.end(); // Do we need to send anything in the res.end?
                });
              }
            }
        });
      }
    });
  }
};
