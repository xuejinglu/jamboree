/* eslint-disable react/jsx-no-bind */
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  changePlace(e) {
    e.preventDefault();
    this.props.getQuery(this.refs.where.value, this.refs.when.value);
  }

  changeDate(e) {
    e.preventDefault();
    this.props.getQuery(this.refs.where.value, this.refs.when.value);
  }

  render() {
    return (
      <div className="search">
        <form id="where" onSubmit={e => this.changePlace(e)}>
          <input type="text" ref="where" />
        </form>
        <div id="when">
          <button value="-1" onClick={e => this.changeDate(e)}>&#9664;</button>
          <form onSubmit={e => this.changeDate(e)}>
            <input type="date" ref="when" />
          </form>
          <button value="1" onClick={e => this.changeDate(e)}>&#9654;</button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  getQuery: React.PropTypes.function,
};

export default Search;
