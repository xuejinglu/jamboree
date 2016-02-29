import React, { Component } from 'react';
// import initMap from '../../public/Helpers'


class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
  }

  componentDidMount() {
    this.renderMap();
  }

  shouldComponentUpdate(nextProps) {
    const myLatLng = getLatLng(nextProps);
    const map = getMap(nextProps);
    this.renderPins(nextProps.parentState.events, map);
    return true;
  }

  getLatLng(props) {
    return {
      lat: Number(props.parentState.lat),
      lng: Number(props.parentState.lng),
    };
  }

  getMap() {
    return new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 13,
      center: myLatLng,
      styles: this.props.parentState.mapStyle,
    });
  }

  renderMap() {
    getLatLng(this.props);
    getMap(this.props);
  }

  renderPins(events, map) {
    const pins = [];
    for (let i = 0; i < events.length; i++) {
      let description;
      if (events[i].description) {
        description = '<br><b>Description</b>: ' + events[i].description + '</p>'; //eslint-disable-line
      } else {
        description = '';
      }
      const contentString = '<h2>' + events[i].title + '</h2>' +//eslint-disable-line
                    '<h3><a href="' + events[i].url + '">Buy Tickets</a></h3>' +
                    '<br><b>Venue</b>: ' + events[i].venue_name +
                    description; //eslint-disable-line
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude), //eslint-disable-line
        message: new google.maps.InfoWindow({ //eslint-disable-line
          content: contentString,
          maxWidth: 320,
          maxHeight: 250,
        }),
        place: events.title,
        description: events.description,
      });
    }
    let currentSelectedMarker;
    pins.forEach((pin) => { //eslint-disable-line
      let marker = new google.maps.Marker({ //eslint-disable-line
        position: pin.latlon,
        map: map, //eslint-disable-line
        title: 'Big Map',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function (){ //eslint-disable-line
        if (currentSelectedMarker) {
          currentSelectedMarker.message.close();
        }
        currentSelectedMarker = pin;
        pin.message.open(map, marker);
      });
    });
  }

  render() {
    return (
      <div className="col-xs-8 " id="map"> This div element contains map </div>
      );
  }
}

Map.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  parentState: React.PropTypes.object,
};


export default Map;
