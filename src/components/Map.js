import React, { Component } from 'react';
// import initMap from '../../public/Helpers'


class Map extends Component {
  constructor(props) {
    super(props);
    /*eslint-disable */
    this.mapStyle = [{'featureType':'administrative.neighborhood','elementType':'labels.text','stylers':[{'visibility':'simplified'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'featureType':'all','elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'visibility':'off'},{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'weight':1.4},{'lightness':14}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#08304b'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'},{'color':'#146474'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#021019'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road.highway','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'road.arterial','elementType':'labels.text','stylers':[{'visibility':'off'}]},{'featureType':'road.local','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'administrative.land_parcel','elementType':'all','stylers':[{'visibility':'on'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'labels.icon','stylers':[{'visibility':'off'}]}];
    /*eslint-enable */
    this.currentSelectedPin = null;
    this.state = {
      map: {},
    };
  }

  /*eslint-disable */
  componentDidMount() {
    this.setState({
      map: this.getMap(this.getLatLng(this.props)),
    });
  }
  /*eslint-enable */

  getLatLng(props) { //eslint-disable-line
    return {
      lat: Number(props.parentState.lat),
      lng: Number(props.parentState.lng),
    };
  }

  getMap(myLatLng) {
    return new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 13,
      center: myLatLng,
      styles: this.mapStyle,
    });
  }

  componentDidUpdate(nextProps) {
    const map = this.state.map;
    const myLatLng = this.getLatLng(nextProps);
    this.renderPins(nextProps.parentState.events, map);
    if (myLatLng.lat && myLatLng.lng) {
      map.setCenter(myLatLng);
      map.setZoom(14);
    }
    return true;
  }

  renderPins(events, map) {
    const context = this;
    const pins = [];
    for (let i = 0; i < events.length; i++) {
      let description;
      if (events[i].description) {
        description = '<br><b>Description</b>: ' + events[i].description + '</p>'; //eslint-disable-line
      } else {
        description = '';
      }
      const contentString = '<h3>' + events[i].title + '</h3>' +//eslint-disable-line
                    '<h4><a href="' + events[i].url + '">Buy Tickets</a></h4>' +
                    '<br><b>Venue</b>: ' + events[i].venue_name +
                    description; //eslint-disable-line
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude), //eslint-disable-line
        message: new google.maps.InfoWindow({ //eslint-disable-line
          content: contentString,
          maxWidth: 275,
          maxHeight: 250,
        }),
        eventIdx: i,
      });
    }
    let bounds = new google.maps.LatLngBounds(); //eslint-disable-line
    pins.forEach((pin) => { //eslint-disable-line
      let marker = new google.maps.Marker({ //eslint-disable-line
        position: pin.latlon,
        map: map, //eslint-disable-line
        title: 'Big Map',
        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
      });

      if (marker.getVisible()) {
        bounds.extend(marker.getPosition());
      }

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function (){ //eslint-disable-line
        if (context.currentSelectedPin) {
          context.currentSelectedPin.message.close();
        }
        context.props.changeCurrEvent(pin.eventIdx);
        context.currentSelectedPin = pin;
        pin.message.open(map, marker);
      });
    });
    map.fitBounds(bounds);
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
