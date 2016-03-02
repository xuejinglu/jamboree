import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { event: props.data };
  }

  render() {
    return (
        <article>
          <h4>{ this.props.data.title }</h4>
          <div>
            <img src="../assets/mapIcon2.png"></img>
            <h5>{ this.props.data.venue_name }</h5>
          </div>
        </article>
    );
  }
}

Event.propTypes = { data: React.PropTypes.object.isRequired };

export default Event;
