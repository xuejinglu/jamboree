var Event = require('./eventModel.js');
var Q = require('q');
var key = require('../keys/apikeys.js')
var eventful = require('eventful-node');
var client = new eventful.Client(key.eventful);

// This function is for optimization to allow auto-refreshing of event listings
// var updateEvent= Q.nbind(Event.update, Event);

module.exports = {
  // Queries DB for event document, if not found, queries eventful API
  getEvents: function(req, res, next) {
    req.query.where = req.query.where.toUpperCase();
    Event.findOne({
      dateAndPlace: req.query.date + req.query.where + req.query.q,
    })
    .then(function(doc){
      if (doc) {
        console.log("retrieving from database...");
        res.json(doc.eventList);
      } else {
        console.log("retrieving from eventful api");
        var eventCount = 0;
        var totalEvents = [];

        // split categories on the comma to then loop through each
        // make an api call to each and put into totalEvents to then store in database
        // store the call in the database as normally would (without split)
        var categories = req.query.q
        categories = categories.split(',');

        console.log("Categories", categories);
        for(var i = 0; i < categories.length; i++) {
          (function (i) {
            category = categories[i];
            console.log("Category", category);
            req.query.q = category;

            client.searchEvents(req.query,
              function(err, data){
                if (err) {
                  console.error("Error received in searchEvents:", err);
                } else {
                  for(var i = 0; i < eventList.length; i++){
                    if(eventList[i].description) {
                      eventList[i].description = eventList[i].description.slice(0, 500) + '...';
                    }
                    var used = ['title',
                      'venue_name',
                      'start_time',
                      'stop_time',
                      'venue_address',
                      'city_name',
                      'region_abbr',
                      'url',
                      'latitude',
                      'longitude',
                      'description'];
                    for(var prop in eventList[i]) {
                      if(used.indexOf(prop) === -1){
                        delete eventList[i][prop];
                      }
                    }
                  }
                }
              });
          })(i);
        }

// ~~~~~~~~~addEventsToDB Function
        var addEventsToDB = function (eventList) {
          Event.create({
            dateAndPlace: req.query.date + req.query.where + req.query.q,
            eventList: eventList,
          }, function (err, list){
            if (err){
              console.log("ERROR: ", err);
            } else {
              console.log('List Added to DB');
            }
            res.json(eventList);
          });
        }
  // ~~~~~~~~~~End addEventsToDB~~~~~~~~~

      }  // else (it's gathering from API)
    }); // .then (after looked in mongo)
  }
};
