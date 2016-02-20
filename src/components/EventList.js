import React, { Component } from 'react';
import Event from './event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: props.data };
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

EventList.propTypes = { data: React.PropTypes.object.isRequired };

export default EventList;
