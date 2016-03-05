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

  extractDataFromEvent( event, idx ) {
    // format event object into data usable by renderPins

    let description;
     if (event.description) {
       description = '<br><b>Description</b>: ' + events.description + '</p>'; //eslint-disable-line
     } else {
       description = '';
     }
     const contentString = '<h3>' + event.title + '</h3>' +//eslint-disable-line
                   '<h4><a href="' + event.url + '">Buy Tickets</a></h4>' +
                   '<br><b>Venue</b>: ' + event.venue_name +
                   '<br><b>Address: </b><a href="http://maps.google.com/?q=' +
                     events[i].venue_address + ',' +
                     events[i].city_name + ',' +
                     events[i].region_abbr +
                     '" TARGET="_blank">' +
                     events[i].venue_address + ', ' +
                     events[i].city_name + ', ' +
                     events[i].region_abbr + '</a></b>' +
                   description; //eslint-disable-line

    return {
      title: event.title,
      position: new google.maps.LatLng( event.latitude, event.longitude ),
      icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
      message: {
        content: contentString,
        maxWidth: 275,
        maxHeight: 250,
      },
      idx: idx,
    }

  }

  extractDataFromEat( eat, idx ) {
    // format eat object into data usable by renderPins
    const address = eat.location.display_address[0] + ' ' + eat.location.display_address[1] + ' ' + eat.location.display_address[2];
    let description = '<h3>' + eat.name + '</h3>' + 
                        '<h4><a href="' + eat.mobile_url + '">Mobile Link</a></h4>' +
                        '<br><b>Address</b>: ' + address +
                        '<br>'
                        '<br><b>Phone</b>: ' + eat.display_phone +
                        '<br><b>Categories</b>: ';
    eat.categories.forEach( function( category, index ) {
      description += category[0];
      if( index+1 < categories.length ) {
        description += ', ';
      }
    });
    description +=      '<br><b>Rating</b>:' + eat.rating;

    return {
      title: name,
      position: new google.maps.LatLng( eat.location.coordinate.latitude, eat.location.coordinate.longitude ),
      icon: '',
      message: {
        content: description,
        maxWidth: 275,
        maxHeight: 250,
      },
      idx: idx,
    }
  }

  // renderPins( Map, Array, Function, Boolean )
  renderPins(map, places, extractData, shouldExpandBounds) {
    // side effect function that sets up markers.
    // event: title, description, url, venue_name, latitude, longitude
    // events: array of event objects.
    // eats: array of eat objects.
    // eat: name, display_phone, , mobile_url, location.coordinate.latitude, location.coordinate.longitude, 
    
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
