var Search = ({getQuery}) => (
  <div class="search" style="border-style:solid; border-color: #80bfff; padding:1em">
    <div class="form-group">
      <label for="zip">Enter a Zipcode:</label>
      <input type="number" class="form-control" id="usr">
    </div>
    <div class="form-group">
      <label for="start">Enter start date: (DDMMYYYY)</label>
      <input type="number" class="form-control" id="start">
            <label for="end">Enter end date: (DDMMYYYY, optional)</label>
      <input type="number" class="form-control" id="end">
      <button type="submit" class="btn btn-info" onclick={getQuery($('#start').val(), $('end').val())} style="margin-top: .5em">
        Start Search
      </button>
    </div>
  </div>
)

window.Search = Search;
