import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.start_date = new Date( this.props.data.start_time );
    this.date_str = this.start_date.toString()
  }

  render() {
    return (
        <article>
          <h4 onClick={ this.props.clickHandler.bind(null, this.props.data) }>{ this.props.data.title }</h4>
            <div className="event">
              <img className="pin" src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"></img>
              <div className="eventText">
                <span className="venueName">{ this.props.data.venue_name }</span>
                <div className="eventDate">{ this.date_str.substr(0, 21) } { this.date_str.substr(-5) }</div>
              </div>
            </div>
        </article>
    );
  }
}

Event.propTypes = { data: React.PropTypes.object.isRequired };

export default Event;
