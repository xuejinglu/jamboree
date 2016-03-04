import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = this.props.currentEvent === this.props.id ? 'currentEvent' : '';
    return (
        <article className={ className }>
          <h4 onClick={ this.props.clickHandler.bind(null, this.props.id) }>{ this.props.data.title }</h4>
          <div>
            <img src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"></img>
            <h5>{ this.props.data.venue_name }</h5>
          </div>
        </article>
    );
  }
}

Event.propTypes = { data: React.PropTypes.object.isRequired };

export default Event;
