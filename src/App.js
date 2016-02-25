import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import Key from './config/apikeys';
import searchEventful from './lib/searchEventful';
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

  getQuery(zip, start, end) {
    let dateRange = start + '00-'; //eslint-disable-line
    if (!end) {
      dateRange = dateRange + start + '00'; //eslint-disable-line
      console.log(dateRange);
    } else {
      dateRange = dateRange + end + '00'; //eslint-disable-line
      console.log(dateRange);
    }
    const options = {
      app_key: Key.eventful,
      location: zip,
      category: 'music',
      page_size: 20,
      date: dateRange,
    };
    const data = searchEventful(options, function (results) { //eslint-disable-line
      console.log('date is ', options.date);
      this.setState({ events: results.events.event });
      this.setState({
        lat: results.events.event[0].latitude,
        lng: results.events.event[0].longitude,
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
          <div className="banner">zip code
          </div>
        </div>
        <div className="app">
          <Search getQuery={ this.getQuery.bind(this) } />
          <br/><br/>
          <Map parentState={ this.state } />
          <br/>
          <EventList data={ this.state.events } />
        </div>
      </container>
    );
  }
  /*eslint-enable */

}

ReactDOM.render(<App />, document.getElementById('app'));
