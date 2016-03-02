export default function (lat, lng, callback) {
  /*eslint-disable */
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
  /*eslint-disable */
}
