import React from 'react';
import getloc from '../utils/getloc';
import getdate from '../utils/getdate';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default placesholders while page is loading
      location: 'Enter Location',
      date: 'mm/dd/yyyy',
    };
  }

  componentDidMount() {
    // sets placeholder values of the date & location fields to curr loc and curr date
    const today = getdate('mm/dd/yyyy');
    const _this = this;
    getloc((loc) => {
      _this.setState(
        {
          location: loc,
          date: today,
        }
      );
    });
  }

  getInput() {
    const cats = [];
    const testChecks = (cat) => {
      if (cat.checked) {
        cats.push(cat.value);
      }
    };
    testChecks(this.refs.music);
    testChecks(this.refs.singles);
    testChecks(this.refs.performing);
    const catStr = cats.join(',');
    this.props.getQuery(this.refs.city.value, this.refs.start.value, this.refs.end.value, catStr);
  }

  /*eslint-disable */
  render() {
    return (
      <div className="search">
        <form className="form-group row">
          <div className="col-md-3">
            <label htmlFor="city">Enter a city or zipcode:</label>
            <input type="text" placeholder={this.state.location}  id="locationField" className="form-control" ref="city"/>
          </div>
          <div className="col-md-3">
            <label htmlFor="start">Enter start date</label>
            <input type="text" placeholder={this.state.date} onfocus="(this.type='date')" className="form-control" ref="start" />
          </div>
          <div className="col-md-3">
            <label htmlFor="end">Enter end date (optional)</label>
            <input type="text" placeholder={this.state.date} onfocus="(this.type='date')" className="form-control" ref="end" />
          </div>
          <div className="col-md-1">
          <button type="submit" className="btn btn-info submitbutton"
            onClick={this.getInput.bind(this)}> Start Search
          </button>
          </div>
        </form>
        <div className="form-group row radio">
          <form action="">
            <div className="col-md-2 col-md-offset-1">
            <input type="checkbox" defaultChecked name="music" value="music" ref="music"/> Concerts
            </div>
            <div className="col-md-2">
            <input type="checkbox" name="singles" value="singles_social" ref="singles"/> Nightlife
            </div>
            <div className="col-md-2">
            <input type="checkbox" name="performing_arts" value="performing_arts" ref="performing"/> Performing Arts
            </div>
          </form>
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
