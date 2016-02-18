var options = {

};

var searchEventful = (options, callback) => {
$.ajax({
      url: "http://api.eventful.com/json/events/search",
      type: 'GET',
      data: options,//JSON.stringify(options),
      contentType: 'application/json',
      success: function (data) {
        // Trigger a fetch to update the messages, pass true to animate
        callback(data);
        console.log(data);
      },
      error: function (data) {
        console.error('Eventful AJAX failed to GET');
      }
    });
  // TODO
};

// window.searchEventful = searchEventful;

option = {
  app_key: EVENTFUL_API_KEY,
  location: 94102,
  date: 'Today',
  category: music
};

