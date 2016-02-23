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

  renderMap () {
    console.log("renderMap position is " , this.props.parentState.lat, this.props.parentState.lng);
    let myLatLng = { lat: this.props.parentState.lat, lng: this.props.parentState.lng };

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

  renderPins(events, map) {
    var pins = [];
    console.log('inside renderPins function');
    for (var i = 0; i < events.length;i ++) {
      var contentString = '<div>placeholder</div>';
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude),
        message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
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
    console.log('NEXT PROPS IS ' , nextProps);
    console.log("reRenderMap position is " , nextProps.parentState.lat, nextProps.parentState.lng);
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
    console.log("nextProps events are ", nextProps.parentState.events);
    console.log('about to enter pins');
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
