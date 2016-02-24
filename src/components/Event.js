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
        <h5>{ this.props.data.venue_name }</h5>
        <h6>{ this.props.data.venue_address}
          <br> { this.props.data.city_name} , { this.props.data.region_abbr}
        </h6>
        <p>{ this.props.data.description }</p>
      </article>
    );
  }
}

Event.propTypes = { data: React.PropTypes.object.isRequired };

export default Event;
