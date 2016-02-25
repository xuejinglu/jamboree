import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getInput() {
    this.props.getQuery(this.refs.city.value, this.refs.start.value, this.refs.end.value);
  }

  /*eslint-disable */
  render() {
    return (
      <div className="search">
        <div className="form-group">
          <div className="col-xs-3">
            <label htmlFor="city">Enter a city name:</label>
            <input type="string" className="form-control" ref="city"/>
          </div>
          <div className="col-xs-3">
            <label htmlFor="start">Enter start date</label>
            <input type="date" className="form-control" ref="start" />
          </div>
          <div className="col-xs-3">
            <label htmlFor="end">Enter end date (optional)</label>
            <input type="date" className="form-control" ref="end" />
          </div>
          <div className="col-xs-1">
          <button type="submit" className="btn btn-info submitbutton"
            onClick={this.getInput.bind(this)}> Start Search
          </button>
          </div>
        </div>
      </div>
    );
  }
  /*eslint-enable */
}

Search.propTypes = {
  getQuery: React.PropTypes.function,
};

export default Search;
