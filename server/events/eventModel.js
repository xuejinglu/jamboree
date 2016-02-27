var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  venue_address: {
    type: String,
    required: true,
  },
  venue_name: {
    type: String,
    required: true,
  },
  venue_url: {
    type: String,
    required: true,
  },
});

