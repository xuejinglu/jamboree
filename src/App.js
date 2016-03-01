import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import EventList from './components/EventList';
import Banner from './components/Banner';
import $ from 'jquery';

/*eslint-disable */
const mapStyle = [{'featureType':'administrative.neighborhood','elementType':'labels.text','stylers':[{'visibility':'simplified'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'featureType':'all','elementType':'labels.text.stroke','stylers':[{'color':'#000000'},{'lightness':13}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'visibility':'off'},{'color':'#000000'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'color':'#144b53'},{'weight':1.4},{'lightness':14}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#08304b'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'color':'#000000'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'color':'#0b434f'},{'lightness':25}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#000000'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#0b3d51'},{'lightness':16}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#000000'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'},{'color':'#146474'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#021019'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road.highway','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'road.arterial','elementType':'labels.text','stylers':[{'visibility':'off'}]},{'featureType':'road.local','elementType':'labels','stylers':[{'visibility':'off'}]},{'featureType':'administrative.land_parcel','elementType':'all','stylers':[{'visibility':'on'}]},{'featureType':'administrative.locality','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'labels.icon','stylers':[{'visibility':'off'}]}];
/*eslint-enable */

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      events: [],
      // events[i].(latitude, longitude, title,  venue_ name,
      // venue_address, venue_url, url, city_name, region_abbr)
      lat: 37.7833,
      lng: -122.4167,
      mapStyle: mapStyle, //eslint-disable-line
      fail: false,
    };
  }

  getQuery(city, start, end, catStr) {
    const formattedStart = start.split('-').join('');
    let dateRange = formattedStart + '00-'; //eslint-disable-line
    if (!end) {
      dateRange = dateRange + formattedStart + '00'; //eslint-disable-line
    } else {
      const formattedEnd = end.split('-').join('');
      dateRange = dateRange + formattedEnd + '00'; //eslint-disable-line
    }
    console.log('cats are : ', catStr);
    const options = {
      where: city,
      q: catStr,
      page_size: 20,
      sort_order: 'popularity',
      date: dateRange,
      within: 7,
      units: 'miles',
    };
    $.ajax({
      url: '/api/events/getList',
      type: 'GET',
      data: options,
      contentType: 'application/json',
      success: (data) => {
        this.setState({ fail: false });
        console.log('call to server successful');
        // console.log(data);
        if (data) {
          const eventList = data;
          this.setState({ events: eventList });
          this.setState({
            lat: eventList[Math.floor(eventList.length / 2)].latitude,
            lng: eventList[Math.floor(eventList.length / 2)].longitude,
          });
        } else {
          this.setState({ fail: true });
        }
      },
      error: (data) => {
        console.error('server AJAX failed to GET');
        console.log('problem is ', JSON.parse(data.responseText));
        console.log(JSON.parse(data.responseText));
      },
    });
  }

  componentDidMount() {


    // var input = document.getElementById('locationField');
    //  var infowindow = new google.maps.InfoWindow();
    // var options = {
    //   types: ['cities']
    // };
    // const autocomplete = new google.maps.places.Autocomplete(input, options);
    // autocomplete.addListener('place_changed', function() {
    //   var place = autocomplete.getPlace();
    //   if (!place.geometry) {
    //     window.alert("Autocomplete's returned place contains no geometry");
    //     return;
    //   }

    //   // If the place has a geometry, then present it on a map.
    //   if (place.geometry.viewport) {
    //     map.fitBounds(place.geometry.viewport);
    //   } else {
    //     map.setCenter(place.geometry.location);
    //     map.setZoom(17);  // Why 17? Because it looks good.
    //   }

    //   var address = '';
    //   if (place.address_components) {
    //     address = [
    //       (place.address_components[0] && place.address_components[0].short_name || ''),
    //       (place.address_components[1] && place.address_components[1].short_name || ''),
    //       (place.address_components[2] && place.address_components[2].short_name || '')
    //     ].join(' ');
    //   }

    //   infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    //   infowindow.open(map, marker);
    // });
  }

  /*eslint-disable */
  render() {
    return (
      <container>
        <Banner />
        <div className="app">
          <a name="mainApp"/>
          <Search getQuery={ this.getQuery.bind(this) } />
          <br/>
          <br/>
          <div className="col-xs-12">
          <h4 className="mapError">{ this.state.fail ? 'There are no events for this time and place. Please try again' : ''}</h4>
            <Map parentState={ this.state } />
            <EventList data={ this.state.events } />
          </div>
        </div>
      </container>
    );
  }
  /*eslint-enable */
}

ReactDOM.render(<App />, document.getElementById('app'));
