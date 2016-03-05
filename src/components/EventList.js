import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import Event from './Event.js';
/*eslint-disable */
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
        <section className="events">
          {this.props.data.map((event, i) =>
            <Event key={i} id={i} data={event} currentEvent={ this.props.currentEvent } clickHandler={ this.clickHandler.bind(this) } />
          )}
        </section>
      </div>
    );
  }
}

EventList.propTypes = { data: React.PropTypes.array.isRequired };
/*eslint-enable */
export default EventList;
