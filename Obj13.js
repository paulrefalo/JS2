window.onload = init;
          
var map = null;          
          
function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMyLocation, locationError);
    }
    else {
        console.log("Sorry, no Geolocation support!");
    }
}
function getMyLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    alert("My position is: " + latitude + ", " + longitude + " to an accuracy of +/- " + accuracy + " meters.");
    
    if (!map) {
        showMap(latitude, longitude);
    }
    addMarker(latitude, longitude, accuracy);
}      

function addMarker(lat, long, acc) {
   var googleLatLong = new google.maps.LatLng(lat, long);
   var markerOptions = {
       position: googleLatLong,
       map: map,
       title: "Where I'm thinking today"
   };
   var marker = new google.maps.Marker(markerOptions);
   
   // I got this circle stuff from:  https://developers.google.com/maps/documentation/javascript/examples/circle-simple
   var accuracyCircle = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: googleLatLong,
      radius: acc
    };
    // Add the circle for this city to the map.
    var geoCircle = new google.maps.Circle(accuracyCircle);
  
}

function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
}

function locationError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage += " " + error.message;
    }
    console.log(errorMessage);
    alert(errorMessage);
}    