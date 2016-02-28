var mongoose = require('mongoose');

// Storing each event document as a date and location, with an array containing events
var EventSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  eventList: {
    type: Array,
  },
  // optimization feature: set up auto-refreshing of cached events based on lastModified date
  // would need to add an update function to the eventController
  lastModified: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('events', EventSchema);
