import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import EventList from './components/EventList';
import Banner from './components/Banner';
import getYouTube from './utils/youtube.js';
import keys from './config/apikeys.js';
import $ from 'jquery';
import getloc from './utils/getloc';
import getdate from './utils/getdate';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { id: { videoId: '' }, snippet: { title: '' } },
      events: [],
      fail: false,
    };
  }

  componentDidMount() {
    // gets the date from utils/getdate
    const today = getdate('yyyy-mm-dd');
    // gets loc from utils/getloc
    getloc((currlocation) => {
      // call getQuery on loc and date
      this.getQuery(currlocation, today, today, 'music');
    });
  }

  getQuery(city, start, end, catStr) { //eslint-disable-line
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
        if (data) {
          const eventList = data;
          this.setState({ events: eventList });
          this.searchYouTube(eventList[0].title, this.handleVideoChange.bind(this));
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

  searchYouTube(search, callback) {
    const options = {
      query: search,
      max: 1,
      key: keys.google,
    };
    getYouTube(options, (data) => {
      callback(data.items[0]);
    });
  }

  handleVideoChange(video) {
    console.log(video);
    this.setState({
      video,
    });
  }

  /*eslint-disable */
  render() {
    return (
      <container>
        <Banner />
        <div className="app">
          <a name="mainApp"/>
          <div className="col-xs-12">
            <Search getQuery={ this.getQuery.bind(this) } />
          </div>
          <br/>
          <br/>
          <div className="col-xs-12">
          <h4 className="mapError">{ this.state.fail ? 'There are no events for this time and place. Please try again' : ''}</h4>
            <Map parentState={ this.state } />
            <EventList data={ this.state.events } video={ this.state.video }/>
          </div>
        </div>
      </container>
    );
  }
  /*eslint-enable */
}

ReactDOM.render(<App />, document.getElementById('app'));
