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
    const myLatLng = {
      lat: Number(nextProps.parentState.lat),
      lng: Number(nextProps.parentState.lng),
    };

    const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 13,
      center: myLatLng,
      styles: this.props.parentState.mapStyle,
    });

    this.renderPins(nextProps.parentState.events, map);
    return true;
  }

  renderMap() {
    const myLatLng = {
      lat: this.props.parentState.lat,
      lng: this.props.parentState.lng,
    };

    const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 13,
      center: myLatLng,
      styles: this.props.parentState.mapStyle,
    });
  }
  // events[i].(latitude, longitude, title,  venue_ name,
  // venue_address, venue_url, url, city_name, region_abbr)
  renderPins(events, map) {
    const pins = [];
    for (let i = 0; i < events.length; i++) {
      console.log(events[i]);
      let description;
      if (events[i].description) {
        description = '<br><b>Description</b>: ' + events[i].description + '</p>'; //eslint-disable-line
      } else {
        description = '';
      }
      const contentString = '<p><b>Event name</b>: ' + events[i].title + //eslint-disable-line
                    '<br><b>Venue</b>: ' + events[i].venue_name +
                    '<br><a href="' + events[i].url + '">Buy Tickets</a>' +
                    description; //eslint-disable-line
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude), //eslint-disable-line
        message: new google.maps.InfoWindow({ //eslint-disable-line
          content: contentString,
          maxWidth: 320,
        }),
        place: events.title,
        description: events.description,
      });
    }
    let currentSelectedMarker;
    pins.forEach((n, i) => { //eslint-disable-line
      // (linter --- i is declared but never used)
      let marker = new google.maps.Marker({ //eslint-disable-line
        position: n.latlon,
        map: map, //eslint-disable-line
        title: 'Big Map',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function (e){ //eslint-disable-line
        if (currentSelectedMarker) {
          currentSelectedMarker.message.close();
        }
        currentSelectedMarker = n;
        n.message.open(map, marker);
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
