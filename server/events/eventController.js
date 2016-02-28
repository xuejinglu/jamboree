var Event = require('./eventModel.js');
var Q = require('q');

var findEvent = Q.nbind(Event.findOne, Event);
var createEvent = Q.nbind(Event.create, Event);

// This function is for optimization to allow auto-refreshing of event listings
// var updateEvent= Q.nbind(Event.update, Event);

module.exports = {
  // Queries DB for event document, if not found, queries eventful API
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
        client.searchEvents({
            location: req.params.location,
            date: req.params.date,
          },
          function(err, data){
            if (err) {
              console.error("Error received in client searchEvents:", err);
            } else {
              if (data) {
                // data received from eventful API, return data to map, then store in db
                res.send(data); // Is this JSON?
                createEvent({
                  location: req.params.location,
                  date: req.params.date,
                  eventList: data,
                  // uses $currentDate to pull date and sets value of lastModified column
                  $currentDate: {
                    lastModified: true,
                  },
                });
                res.end(); // Do we need to send anything in the res.end?
              }
            }
        });
      }
    });
  }
};
