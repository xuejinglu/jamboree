import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import initMap from '../public/Helpers'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapOptions: {
        center: {lat: 37.7833, lng: 122.4167},
        zoom: 3
      },
      map: null
    }
  }


  render () {
    return (
      <div>
        <div> something </div>
        <Map props={this.state}/>
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
