import React, { Component } from 'react';
import Event from 'event';

const SAMPLE_DATA = [
  {
    name: 'The Beegees',
    date: '2016-12-15T08:00:00',
    venue: {
      name: 'Civic Auditorium',
      lat: 37.7780405,
      lng: -122.41741339999999,
    },
    description: 'Stayin\' alive.',
    thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
  },
  {
    name: 'Parliament Funkadelic',
    date: '2016-12-17T10:00:00',
    venue: {
      name: 'The Fillmore',
      lat: 37.7840042,
      lng: -122.43313319999999,
    },
    description: 'Give up the funk.',
    thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
  },
  {
    name: 'Pink Floyd',
    date: '2016-12-17T08:00:00',
    venue: {
      name: 'The Warfield',
      lat: 37.7826598,
      lng: -122.41018099999997,
    },
    description: 'Just another brick in the wall.',
    thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
  },
];

class EventList extends Component {
  constructor(props) {
    super(props);
    // this.state = { events: props.events };
    this.state = { events: SAMPLE_DATA };
  }

  render() {
    return (
      <section className="eventList">
        {this.state.events.map((event, i) =>
          <Event key={i} data={event} />
        )}
      </section>
    );
  }
}

export default EventList;
