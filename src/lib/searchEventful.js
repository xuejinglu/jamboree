import $ from 'jquery';

const searchEventful = (options, callback) => {
  // const options = {
  //   app_key: eventful,
  //   location: 94102,
  //   category: 'music',
  //   page_size: 20,
  //   date: 'Today',
  // };

  $.ajax({
    url: 'http://api.eventful.com/json/events/search',
    type: 'GET',
    data: options,
    contentType: 'application/json',
    success: (data) => {
      console.log(data);
      callback(data);
    },
    error: (data) => {
      console.error('Eventful AJAX failed to GET');
      console.log('problem is ', JSON.parse(data.responseText));
      callback(JSON.parse(data.responseText));
    },
  });
};

export default searchEventful;
