"use strict";
app.controller("HomeController",
    //["$scope", "$http", "$location"]
    function($scope, $rootScope, $http, $location, UserService, GoogleFactory) {
        function initialize() {
            //console.log("anything in HomeController");
            var page = 0;
            $scope.data = [];
            $scope.zipcode = "";
            var markers = [];
            var map;
            var myLatlng = { lat: 36.174465, lng: -86.767960 };

            //$scope.firstUser = UserService.first();
            $scope.map = new google.maps.Map(document.getElementById("map"),
            {
                center: myLatlng,
                zoom: 8,
                scrollwheel: false,
                mapTypeId: "roadmap"
            });

            $scope.marker = new google.maps.Marker
            ({
                position: myLatlng,
                map: $scope.map,
                zoom: $scope.map.setZoom(12),
                title: "Click to zoom"
            });


            $scope.getNashData = function() {
                //console.log("Get Nash Data Function");
                $.ajax({
                    url: "https://data.nashville.gov/resource/p5r5-bnga.json",
                    type: "GET",
                    data: {
                        "$limit": 20,
                        "$offset": page,
                        "$$app_token": "txvTrGDA6QIe9HrEnzsO9ZEtt"
                        // "$$app_token": "NASHVILLEDATA"
                    }
                }).done(function(data) {
                    var list = [];
                    Object.keys(data).forEach(function(key) {
                        var id = parseInt(page) + parseInt(key);
                        data[key].id = id;
                        list.push(data[key]);
                    });
                    $scope.data = $scope.data.concat(list);
                    $scope.$apply();
                    console.log("initial data return", data);


                    for(var x in data) {
                        var permitIssued = data[x];
                        for (var y in permitIssued.mapped_location.coordinates) {
                            var permitLocations = permitIssued[y];
                        }
                        var location = new google.maps.LatLng(permitIssued.mapped_location.coordinates[1], permitIssued.mapped_location.coordinates[0]);
                        var marker = new google.maps.Marker({
                            position: location,
                            title: permitIssued.address,
                            map: $scope.map
                        });

                    }
                });
            };

            $scope.loadMore = function(data) {
                console.log("LoadMore function");
                page += 20;
                $scope.home();
            };

            $scope.logout = function() {
                console.log("Logout function");
                sessionStorage.removeItem("token");
                $http.defaults.headers.common["Authorization"] = "";
                $location.path("/");
            };

            $scope.save = function(obj) {
                console.log("Save Function", obj);
                $http({
                        url: "api/Save/Result",
                        method: "POST",
                        data: {
                            "Address": obj.address,
                            "ZipCode": obj.mapped_location_zip,
                            "District": obj.council_dist,
                            "Cost": obj.const_cost,
                            "PermitType": obj.permit_subtype_description,
                            "Purpose": obj.purpose,
                            "DescriptionOfBuild": obj.permit_type_description
                        }
                    })
                    .then(function(result) {
                        console.log("Save Function result", result);
                    });
            };

            $scope.loadOnMap = function(obj) {
                console.log("LoadOnMap Function", obj);
                var location = {
                    lat: obj.mapped_location.coordinates[0],
                    lng: obj.mapped_location.coordinates[1]
                };
                console.log("location in HomeController", location);


                // Handles when the search button is clicked and what data is being passed
                $scope.search = function() {
                    console.log("query from input of $scope.query:", $scope.query);
                    GoogleFactory.getLocationItems($scope.map, $scope.query)
                        .then(function(result) {

                            console.log("result in GoogleController return from GoogleFactory", result);
                            $scope.map.setCenter(result[0].geometry.location);

                            var marker = new google.maps.Marker({
                                position: result[0].geometry.location,
                                map: $scope.map,
                                zoom: $scope.map.setZoom(12),
                                draggable: true,
                                title: "Click to zoom",
                                icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
                            });

                            // Infowidow sets data that is being passed into the marker  
                            var infowindow = new google.maps.InfoWindow({
                                content: result[0].formatted_address
                            });

                            marker.addListener("click",
                                function() {
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
                // AUTOCOMPLETE
                var options = {
                    componentRestrictions: { country: "us" }
                };
                var inputFrom = document.getElementById("searchInput");
                console.log("searchInput", inputFrom);
                var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
                google.maps.event.addListener(autocompleteFrom,
                    "place_changed",
                    function() {
                        var place = autocompleteFrom.getPlace();
                        autocompleteFrom.bindTo("bounds", $scope.map);
                        $scope.query = place.formatted_address;
                        $scope.$apply();
                    });
               
            };
           
        }
        initialize();
    });
//$scope.map.setCenter(location);

//var request = {
//    location: $scope.map.getCenter(),
//    radius: '500'
//};

//map = new google.maps.places.PlacesService(location);

//var marker = new google.maps.Marker({
//    position: location,
//    map: $scope.map,
//    zoom: $scope.map.setZoom(12),
//    draggable: true,
//    title: "Click to zoom",
//    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
//});





//var pyrmont = new google.maps.LatLng(36.174465, -86.767960);
//var myLatlng = { lat: 36.174465, lng: -86.767960 };

//NOT WORKING ALSO NOT IMPORTANT
//$scope.marker = new google.maps.Marker({

//    position: UserService.nashDataLocation || myLatlng,
//    map: $scope.map,
//    title: "Click to zoom"
//});
//console.log($scope.marker);


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