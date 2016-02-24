import React, { Component } from 'react';
// import initMap from '../../public/Helpers'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
    }
  }

  renderMap() {
    console.log('renderMap position is ', this.props.parentState.lat, this.props.parentState.lng);
    const myLatLng = { lat: this.props.parentState.lat, lng: this.props.parentState.lng };

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLatLng,
    });

    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!',
    });
  }
//events[i].(latitude, longitude, title,  venue_ name, venue_address, venue_url, url, city_name, region_abbr)
  renderPins(events, map) {
    var pins = [];
    for (var i = 0; i < events.length;i ++) {
      let description;
      if (event.description) {
        description = '<br><b>description</b>: ' + events[i].description + '</p>';
      } else {
        description = '';
      }
      const contentString = '<p><b>Event name</b>: ' + events[i].title +
                    '<br><b>Venue</b>: ' + events[i].venue_name +
                    '<br><a href="' + events[i].url + '">More event information</a>' +
                    description;
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude),
        message: new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 320,
        }),
        place: events.title,
        description: events.description,
      });
    }
    var currentSelectedMarker;
    pins.forEach(function(n, i){
      var marker = new google.maps.Marker({
        position: n.latlon,
        map: map,
        title: "Big Map",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      });

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function(e){
        if (currentSelectedMarker){
            currentSelectedMarker.message.close();
        }
        currentSelectedMarker = n;
        n.message.open(map, marker);
      });
    });
  }



  componentDidMount() {
    this.renderMap();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let myLatLng = { lat: Number(nextProps.parentState.lat), lng: Number(nextProps.parentState.lng) };

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myLatLng,
    });

    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!',
    });
    this.renderPins(nextProps.parentState.events, map);
    return true;
  }

  render() {
    return (
      <div id="map"> This div element contains map </div>
      );
  }
}

export default Map;
