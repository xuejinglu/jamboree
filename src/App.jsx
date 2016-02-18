import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
  render() {
    return (
      <h1>Hello World!</h1>
      <h2>testing<h2>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
