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
      <Map props={this.state}/>
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
