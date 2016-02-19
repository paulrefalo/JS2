function findLocation() {
    // alert("geolocation");
    navigator.geolocation.getCurrentPosition(displayLocation, locationError);
}

function displayLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // addFeature("Just used Geolocation to get your Lat/Long: " + latitude + ", " + longitude);
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

function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Where I'm thinking today"
    }
    var marker = new google.maps.Marker(markerOptions);
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

function googleMap(lat, long) {
    if (!map) {
        showMap(lat, long);
    }
    addMarker(lat, long);
}