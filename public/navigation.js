//a = db.query;
//slow = [
// { lat: 4564654, lon: 58476874 },
// { lat: 4564654, lon: 58476874 },
//{ lat: 4564654, lon: 58476874 },
//];
// const express = require("express");
// const Chargingstation = require("../models/chargingstation.js");
// const l = require("../frontend1.js");
// async function coords() {
//   coords1 = [];
//   list = await Chargingstation.find({ latitude: { $exists: true } });
//   for (let i = 0; i < list.length; i++) {
//     coords1.push({ lat: list[i].latitude, lng: list[i].longitude });
//     // console.log(list[i].latitude, list[i].longitude, list[i].chargeType);
//     return coords1;
//   }
// }

//const Chargingstation = require("../models/chargingstation.js");

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
  // console.log(coords());
  // Create the initial InfoWindow.

  // navigation

  // window.initMap = initMap;
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
  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
    // return;
  });
  // document
  //   .getElementById("hide-markers")!
  // map.addEventListener("click", hideMarkers);
}

function saveData() {
  // var ss = document.getElementById(origin).value;
  console.log(document.getElementById(origin));
  alert("There....");
}

function placeMarkerAndPanTo(latLng, map) {
  // var lat = latLng.lat(); // lat of clicked point
  // var lng = latLng.lng(); // lng of clicked point
  // var markerId = getMarkerUniqueId(lat, lng);
  // console.log("-------=======", lat, lng, markerId);
  // new google.maps.Marker({
  //   position: latLng,
  //   id: "mrk",
  //   map: map,
  // });
  // map.panTo(latLng);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
  var infowindow = new google.maps.InfoWindow({
    content:
      "<form method='post' action='/' >" +
      "<h4>" +
      '<label for="name" >' +
      "Station Name" +
      "</label>" +
      "</h4>" +
      '<input type="text" id="origin" name="stationName">' +
      "<br>" +
      "<h4>" +
      '<label for="phone" >' +
      "Phone Number" +
      "</label>" +
      "</h4>" +
      '<input type="number" id="origin1" name="phone">' +
      "<br>" +
      "<h4>" +
      '<label for="address">' +
      "Address " +
      "</label>" +
      "</h4>" +
      '<textarea id="description" name="description" rows="4" cols="50">' +
      "</textarea>" +
      "<h4>" +
      '<label for="description">' +
      "Description" +
      "</label>" +
      "</h4>" +
      '<input type="text" id="description" name="description" >' +
      "<br>" +
      '<input type="checkbox" id="vehicle1" name="ccs2" value="fast">' +
      '<label for="vehicle1">' +
      " Fast Charging" +
      "</label>" +
      "<br>" +
      '<input type="checkbox" id="vehicle2" name="type2" value="slow">' +
      '<label for="vehicle2">' +
      "Slow Charging" +
      "</label>" +
      "<br>" +
      "<h4>" +
      '<label for="payment">' +
      "Payment Required" +
      "</label>" +
      "</h4>" +
      '<input type="payment" id="description" name="payment" >' +
      "<br>" +
      "<center>" +
      '<input type="button" class="btn btn-primary mt-2" value="Add Station Details">' +
      "</center>" +
      "</form>",
  });
  infowindow.open(map, marker);
}
// document.getElementById("mrk").innerHTML = "Hello JavaScript!";
window.initMap = initMap;

// Removes the markers from the map, but keeps them in the array.
// function hideMarkers(latLng, map): void {
//   setMapOnAll(null);
// }
