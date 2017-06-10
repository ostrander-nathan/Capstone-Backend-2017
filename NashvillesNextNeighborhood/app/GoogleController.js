"use strict";
app.controller("GoogleController",
    function($scope, $rootScope, GoogleFactory, $location, UserService) {
        //var infowindow;
        var markers = [];
        var map;
        var marker;
        console.log("anything in GoogleController");

        $scope.users = UserService.all();

        // INITIALIZING MAP
        function initialize() {
            //var pyrmont = new google.maps.LatLng(36.174465, -86.767960);
            var myLatlng = { lat: 36.174465, lng: -86.767960 };

            //NOT WORKING ALSO NOT IMPORTANT
            $scope.marker = new google.maps.Marker({
                position: myLatlng,
                map: $scope.map,
                title: "Click to zoom"
            });

            $scope.map = new google.maps.Map(document.getElementById("map"),
            {
                center: myLatlng,
                zoom: 8,
                scrollwheel: false,
                mapTypeId: "roadmap"
            });

            // Handles when the search button is clicked and what data is being passed
            $scope.search = function () {
                console.log("query from input of $scope.query:", $scope.query);
                GoogleFactory.getLocationItems($scope.map, $scope.query)
                    .then(function(result) {
                        console.log("result in GoogleController return from GoogleFactory",result );
                        $scope.map.setCenter(result[0].geometry.location);

                        marker = new google.maps.Marker({
                            position: result[0].geometry.location,
                            map: $scope.map,
                            draggable: true,
                            title: "Click to zoom",
                            icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        });

                        // Infowidow sets data that is being passed into the marker  
                        var infowindow = new google.maps.InfoWindow({
                            content: result[0].formatted_address
                        });

                        marker.addListener('click', function () {
                            console.log("marker hit");
                            infowindow.open($scope.map, marker);
                            $scope.map.setZoom(18);
                            $scope.map.setCenter(marker.getPosition());
                        });
                        console.log("marker in search Functions", marker);
                        console.log("result of input search button click", result);
                        var markers = result;
                        console.log("markers", markers);
                    });
            };

            //Handles AutoComplete of pac-input only for actual autocomplete
            var input = document.getElementById("pac-input");
            //ATTEMPT TO FIX ISSUE WHERE DATA RETURNED WITH United States is messing up the return
            var options = {
                types: ["(cities)"],
                componentRestrictions: {country: "us"}//United States only
            };
            //var autocomplete = new google.maps.places.Autocomplete(input, options);
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo("bounds", $scope.map);// Binds autocomplete obj to map

            //marker.setMap(null); will need to set markers to null
            //infowindow.close(); will possibly need
            //This will be needed to load Json from NashvilleData maybe but maybe not
            //loadGeoJson(url:string, options?:Data.GeoJsonOptions, callback?:function(Array<Data.Feature>))

            //Add Marker to map when called 
            //function addMarkerFromNashData(location) {
            //    console.log("Getting hit in GoogleController from HomeController", location);
            //    var icon = {
            //        url: "/app/constructionIcon.png",
            //        scaledSize: new google.maps.Size(30, 30),
            //        origin: new google.maps.Point(0, 0),
            //        anchor: new google.maps.Point(0, 0)
            //    }
            //    var marker = new google.maps.Marker({
            //        position: location,
            //        map: $scope.map,
            //        icon: icon
            //    });

            //};
            //$scope.$apply();



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


            // THIS PASSES IN THE LOCATIONS TO THE INFO WINDOW
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

        }

        initialize();
    });
//AIzaSyCGjx47WRbhcn8APdrr96y1qCJto1M98C4