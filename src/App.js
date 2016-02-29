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
    };
  }

  getQuery(city, start, end) {
    const formattedStart = start.split('-').join('');
    let dateRange = formattedStart + '00-'; //eslint-disable-line
    if (!end) {
      dateRange = dateRange + formattedStart + '00'; //eslint-disable-line
    } else {
      const formattedEnd = end.split('-').join('');
      dateRange = dateRange + formattedEnd + '00'; //eslint-disable-line
    }
      // app_key: Key.eventful,  THIS WAS REMOVED FROM OPTIONS
    const options = {
      where: city,
      q: 'music',
      page_size: 20,
      sort_order: 'popularity',
      date: dateRange,
    };
    $.ajax({
      url: '/api/events/getList',
      type: 'GET',
      data: options,
      contentType: 'application/json',
      success: (data) => {
        console.log('call to server successful');
        console.log(data);
        const eventList = data;
        this.setState({ events: eventList });
        this.setState({
          lat: eventList[Math.floor(eventList.length / 2)].latitude,
          lng: eventList[Math.floor(eventList.length / 2)].longitude,
        });
        // console.log(JSON.parse(data.responseText));
      },
      error: (data) => {
        console.error('server AJAX failed to GET');
        console.log('problem is ', JSON.parse(data.responseText));
        console.log(JSON.parse(data.responseText));
      },
    });
    // EVDB.API.call('/events/search', options, function (results) { //eslint-disable-line
    //   console.log('results', results);
    //   const eventList = results.events.event;
    //   this.setState({ events: results.events.event });
    //   this.setState({
    //     lat: eventList[Math.floor(eventList.length / 2)].latitude,
    //     lng: eventList[Math.floor(eventList.length / 2)].longitude,
    //   });
    // }.bind(this)); // eslint-disable-line
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
