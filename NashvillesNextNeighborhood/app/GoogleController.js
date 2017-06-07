"use strict";
app.controller("GoogleController", function ($scope, $rootScope, GoogleFactory, $location) {
    var service;
    var infowindow;
    var markers = [];
    var map;
    console.log("anything in GoogleController");

    // INITIALIZING MAP
    function initialize() {
        var pyrmont = new google.maps.LatLng(36.174465, -86.767960);
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15,
            scrollwheel: false,
            mapTypeId: 'roadmap'
        });
        //Gets value from input
            var input = document.getElementById('pac-input');
            var autocomplete = new google.maps.places.Autocomplete(input);

            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            autocomplete.bindTo('bounds', $scope.map);

            var infowindow = new google.maps.InfoWindow();
            //var infowindowContent = document.getElementById('infowindow-content');
            //infowindow.setContent(infowindowContent);
            var marker = new google.maps.Marker({
                map: $scope.map,
                anchorPoint: new google.maps.Point(0, -29)
            });


        autocomplete.addListener('place_changed',
            function() {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();

                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }
                if (status == google.maps.GeocoderStatus.OK && place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                }
 
               
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = '';
                if (place.address_components) {
                    address = [
                      (place.address_components[0] && place.address_components[0].short_name || ''),
                      (place.address_components[1] && place.address_components[1].short_name || ''),
                      (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }
            });
            $scope.search = function () {
                GoogleFactory.getLocationItems($scope.map, $scope.query)
                    .then(function (result) {
                        $scope.map.setCenter(result[0].geometry.location);
                            marker = new google.maps.Marker({
                            position: result[0].geometry.location,
                            map: $scope.map,
                            draggable: true,
                            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        });
                        console.log("marker", marker);
                        console.log("result of search button click", result);

                        var input = document.getElementById('pac-input');
                        console.log("input from search box pac-input", result);
                        var markers = result;
                        console.log("markers", markers);
                    });
            };
            //marker.setMap(null); will need to set markers to null




        // This event listener will call addMarker() when the map is clicked.
        //$scope.map.addListener('click', function (event) {
        //    addMarker(event.latLng);
        //});

        // Adds a marker to the map and push to the array.
        //function addMarker(location) {
        //    var icon = {
        //        //url: "/images/droneIcon.png",
        //        scaledSize: new google.maps.Size(30, 30),
        //        origin: new google.maps.Point(0, 0),
        //        anchor: new google.maps.Point(0, 0)
        //    };

        //    var markerAdd = new google.maps.Marker({
        //        position: location,
        //        map: $scope.map,
        //        animation: google.maps.Animation.DROP,
        //        icon: icon
        //    });
        //    markerAdd.addListener('click', toggleBounce);

        //    function toggleBounce() {
        //        if (markerAdd.getAnimation() !== null) {
        //            markerAdd.setAnimation(null);
        //        } else {
        //            markerAdd.setAnimation(google.maps.Animation.BOUNCE);
        //        }
        //    }
            //var contentString = `<div><a href='#/users/review/lat/${location.lat()}/lng/${location.lng()}'>Add Review</a></div>`;
            //var infoWindow = new google.maps.InfoWindow({
            //    map: $scope.map,
            //    content: contentString
            //});

            //markerAdd.addListener('click', function () {
            //    infoWindow.open($scope.map, markerAdd);
            //});

            //markers.push({
            //    lat: markerAdd.getPosition().lat(),
            //    lng: markerAdd.getPosition().lng()
            //});
            //$scope.$apply();
        //}

        // Create the search box and link it to the UI element.
        
    }
    initialize();
});
//AIzaSyCGjx47WRbhcn8APdrr96y1qCJto1M98C4
