import React from 'react';
import $ from 'jquery';
const Search = ({ getQuery }) => (
  <div className="search" style="border-style:solid; border-color: #80bfff; padding:1em">
    <div className="form-group">
      <label htmlFor="zip">Enter a Zipcode:</label>
      <input type="number" className="form-control" id="zip"/>
    </div>
    <div className="form-group">
      <label htmlFor="start">Enter start date: (DDMMYYYY)</label>
      <input type="number" className="form-control" id="start" />
            <label htmlFor="end">Enter end date: (DDMMYYYY, optional)</label>
      <input type="number" className="form-control" id="end" />
      <button type="submit" className="btn btn-info" onClick={ getQuery($('#start').val(), $('end').val()) } style="margin-top: .5em">
        Start Search
      </button>
    </div>
  </div>
);

export default Search;
