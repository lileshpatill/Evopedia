function initMap() {
  //
  //console.log(Chargingstation);
  const myLatlng = { lat: 20.5937, lng: 78.9629 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4.5,
    center: myLatlng,
  });
  map.data.loadGeoJson("./public/location.json");
  map.data.setStyle(function (feature) {
    return {
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      },
    };
  });

  // navigation

  var origin = document.getElementById("origin").value;
  var destination = document.getElementById("destination").value;

  // Initialize the Directions service
  var directionsService = new google.maps.DirectionsService();

  // Set the travel mode
  var travelMode = google.maps.TravelMode.DRIVING;

  // Set up the request for directions
  var request = {
    origin: origin,
    destination: destination,
    travelMode: travelMode,
  };

  // Call the Directions service to get the directions
  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      // Display the directions on the map
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setDirections(response);
      directionsRenderer.setMap(map);
      suppressMarkers: false;
    } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
      alert("Sorry, we could not find a route between the selected locations.");
    } else {
      // alert(
      // "Sorry, there was an error retrieving the directions. Error code: " +
      console.log(status);
      // );
    }
  });

  function saveData() {
    // var ss = document.getElementById(origin).value;
    console.log(document.getElementById(origin));
    alert("There....");
  }

  window.initMap = initMap;
}
