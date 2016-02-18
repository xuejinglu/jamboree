import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';

export class App extends Component {
  render() {
    return <Map />;
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
