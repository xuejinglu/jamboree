import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import initMap from '../../public/Helpers'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

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
      <Map />
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));



  // render() {
  //   console.log("this.state.mapOptions", this.state.mapOptions);
  //   return (
  //     <div>
  //       <div>

  //       </div>
  //       <div>
  //         <Map />
  //       </div>
  //     </div>
  //     )
  // }
