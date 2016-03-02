export default function (callback) {
  /*eslint-disable */
  var startPos;
  var lat;
  var lng;
  var geoSuccess = function(position) {
    startPos = position;
    lat = startPos.coords.latitude;
    lng = startPos.coords.longitude;
    
    const geocoder = new google.maps.Geocoder;
    const  latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};

    geocoder.geocode({ 'location': latlng }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // returns zipcode
        const currlocation = `${results[4].address_components[0].long_name}`;
        callback(currlocation);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  /*eslint-disable */
}
