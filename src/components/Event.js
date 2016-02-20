import React, { Component } from 'react';

const SAMPLE_DATA = {
  name: 'Parliament Funkadelic',
  date: '2016-12-17T10:00:00',
  venue: {
    name: 'The Fillmore',
    lat: 37.7840042,
    lng: -122.43313319999999,
  },
  description: 'Give up the funk.',
  thumbnail: 'http://path.to.eventful.cdn.com/thumbnail.jpg',
};

class Event extends Component {
  constructor(props) {
    super(props);
    // this.state = { data: props.data };
    this.state = { data: SAMPLE_DATA };
  }

  render() {
    return (
      <article>
        <h4>{ this.state.data.name }</h4>
        <h5>{ this.state.data.venue.name }</h5>
        <h6>{ this.state.data.date }</h6>
        <p>{ this.state.data.description }</p>
      </article>
    );
  }
}

export default Event;
