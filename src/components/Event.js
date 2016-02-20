import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { event: props.data };
  }

  render() {
    return (
      <article>
        <h4>{ this.state.event.name }</h4>
        <h5>{ this.state.event.venue.name }</h5>
        <h6>{ this.state.event.date }</h6>
        <p>{ this.state.event.description }</p>
      </article>
    );
  }
}

Event.propTypes = { data: React.PropTypes.object.isRequired };

export default Event;
