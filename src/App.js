import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import Key from './config/apikeys';
import searchEventful from './lib/searchEventful';
import EventList from './components/EventList';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapOptions: {
        center: { lat: 37.7833, lng: 122.4167 },
        zoom: 3,
      },
      map: null,
      events: [],
      //events[i].(latitude, longitude, title,  venue_ name,
        //venue_address, venue_url, url, city_name, region_abbr)
      lat: 37.7833,
      lng: -122.4167,
    };
  }

  getQuery(zip, start, end) {
    let dateRange = start + '00-';
    if (!end) {
      dateRange = dateRange + start + '00';
      console.log(dateRange);
    } else {
      dateRange = dateRange + end + '00';
      console.log(dateRange);
    }
    let options = {
      app_key: Key.eventful,
      location: zip,
      category: 'music',
      page_size: 20,
      date: dateRange,
    };
    let data = searchEventful(options, function (results) {
      console.log('date is ', options.date);
      this.setState({ events: results.events.event });
      this.setState({
        lat: results.events.event[0].latitude,
        lng: results.events.event[0].longitude,
      });
    }.bind(this));
  }


  render() {
    return (
      <container>
        <h1> JAMBOREE </h1>
        <Search getQuery={ this.getQuery.bind(this) } />
        <br/><br/>
        <Map parentState={ this.state } />
        <br/>
        <EventList data={ this.state.events } />
      </container>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
