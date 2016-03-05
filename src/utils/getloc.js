export default function (callback) {
  /*eslint-disable */
  let startPos;
  let lat;
  let lng;
  let geoSuccess = function(position) {
    startPos = position;
    lat = startPos.coords.latitude;
    lng = startPos.coords.longitude;

    const geocoder = new google.maps.Geocoder;
    const  latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};

    geocoder.geocode({ 'location': latlng }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        // returns zipcode
        const currlocation = `${results[0].address_components[7].long_name}`;
        callback(currlocation);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
  /*eslint-disable */
}
