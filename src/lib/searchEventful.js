var options = {
  app_key: 'jh8HDfBxzXZC7sZ5',
  location: 94102,
  category: 'music',
  page_size: 20,
  date: 'Today'
};

var searchEventful = (options, callback) => {
  $.ajax({
    url: "http://api.eventful.com/json/events/search",
    type: 'GET',
    data: options,
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      callback(data);
    },
    error: function (data) {
      console.error('Eventful AJAX failed to GET');
      console.log('problem is ', JSON.parse(data.responseText));
      callback(data);
    }
});
};
