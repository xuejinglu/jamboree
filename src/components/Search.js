import React from 'react';
import $ from 'jquery';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getInput() {
    this.props.getQuery(this.refs.zip.value, this.refs.start.value, this.refs.end.value);
  }

  render() {
    return (
      <div className="search">
        <div className="form-group">
          <div className="col-xs-3">
            <label htmlFor="zip">Enter a Zipcode:</label>
            <input type="number" className="form-control" ref="zip"/>
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
            onClick={this.getInput.bind(this)}>
              Start Search </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
