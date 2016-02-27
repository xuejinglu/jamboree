import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import Key from './config/apikeys';
import EventList from './components/EventList';

/*eslint-disable */
const mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
];
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
    const options = {
      app_key: Key.eventful,
      where: city,
      q: 'music',
      page_size: 20,
      sort_order: 'popularity',
      date: dateRange,
    };
    EVDB.API.call("/events/search", options, function (results) { //eslint-disable-line
      const eventList = results.events.event;
      this.setState({ events: results.events.event });
      this.setState({
        lat: eventList[Math.floor(eventList.length / 2)].latitude,
        lng: eventList[Math.floor(eventList.length / 2)].longitude,
      });
    }.bind(this)); // eslint-disable-line
  }

  /*eslint-disable */
  render() {
    return (
      <container>
        <div id="banner-container">
          <div className="banner">
            FIND YOUR JAMBOREE
          </div>
          <div className="banner">BY CITY
          </div>
        </div>
        <div className="app">
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
