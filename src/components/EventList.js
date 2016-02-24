import React, { Component } from 'react';
import Event from './event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: this.props.data };
  }

  render() {
    return (
      <section className="eventList">
        <div> EVENTS </div>
        {this.props.data.map((event, i) =>
          <Event key={i} data={event} />
        )}
      </section>
    );
  }
}

EventList.propTypes = { data: React.PropTypes.array.isRequired };

export default EventList;
