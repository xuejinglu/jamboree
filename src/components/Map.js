import React, { Component } from 'react';
import initMap from '../../public/Helpers'

class Map extends Component {
  constructor(props){
    super(props);
  }

  initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044};

    console.log("WHAT!!!");

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    console.log(map);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });


  }

  render() {
    console.log("we're in Map render!!");

    return (
      <div> {this.initMap()}</div>
      )
  }
}

export default Map;




