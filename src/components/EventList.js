import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import Event from './Event.js';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  clickHandler(event) {
    this.props.changeCurrEvent(event);
  }

  render() {
    return (
      <div className="col-xs-4 eventList">
      <VideoPlayer video={ this.props.video } />
        <section>
          <div className="events">
          {this.props.data.map((event, i) =>
            <Event key={i} data={event} clickHandler={ this.clickHandler.bind(this) } />
          )}
          </div>
        </section>
      </div>
    );
  }
}

EventList.propTypes = { data: React.PropTypes.array.isRequired };

export default EventList;
