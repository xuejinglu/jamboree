import React, { Component } from 'react';
import Event from './event';

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { events: this.props.data };
  }

  render() {
    return (
      <div className="col-xs-4">
        <section className="eventList">
          <div className="events-header"> EVENTS </div>
          {this.props.data.map((event, i) =>
            <Event key={i} data={event} />
          )}
        </section>
      </div>
    );
  }
}

EventList.propTypes = { data: React.PropTypes.array.isRequired };

export default EventList;
