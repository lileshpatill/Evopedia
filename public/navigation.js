//a = db.query;
//slow = [
// { lat: 4564654, lon: 58476874 },
// { lat: 4564654, lon: 58476874 },
//{ lat: 4564654, lon: 58476874 },
//];

function initMap() {
  const myLatlng = { lat: 20.5937, lng: 78.9629 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4.5,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
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

  window.initMap = initMap;
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
    } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
      alert("Sorry, we could not find a route between the selected locations.");
    } else {
      // alert(
      // "Sorry, there was an error retrieving the directions. Error code: " +
      console.log(status);
      // );
    }
  });
  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });
}
function placeMarkerAndPanTo(latLng, map) {
  new google.maps.Marker({
    position: latLng,
    map: map,
  });
  map.panTo(latLng);
}

window.initMap = initMap;
