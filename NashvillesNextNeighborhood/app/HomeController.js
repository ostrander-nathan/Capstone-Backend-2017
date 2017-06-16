"use strict";
app.controller("HomeController",
[
    "$scope", "$http", "$rootScope", "$filter",
    function($scope, $http, $rootScope, $filter) {
        $rootScope.locationResult = {};
        var page = 0;
        $scope.markers = [];
        var myLatlng = { lat: 36.166208, lng: -86.771413 };
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.data = [];
        $scope.q = "";
        $scope.input = "";
        var icon = {
            url: "//maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };

        //Sets up Map Obj in addMap function
        $scope.addMap = function(myLatlng) {
            $scope.map = new google.maps.Map(document.getElementById("map"),
            {
                center: myLatlng,
                zoom: 8,
                scrollwheel: false,
                mapTypeId: "roadmap"
            });
        };
        // $scope.marker is my initial marker that sets up with titans logo
        //Sets up Markers Obj in addMarker function
        $scope.addMarker = function(myLatlng) {
            $scope.marker = new google.maps.Marker
            ({
                position: myLatlng,
                map: $scope.map,
                zoom: $scope.map.setZoom(12),
                icon: icon,
                title: "Click to zoom"
            });
            $scope.markers.push($scope.marker);
        };


        // Removes the markers from the map
        $scope.clearMarkers = function() {
            $scope.markers = [];
        };

        // Deletes all markers in the array 
        $scope.deleteMarkers = function() {
            $scope.clearMarkers();
            $scope.addMap(myLatlng);
            $scope.addMarker(myLatlng);
            $scope.input = "";
        };
        $scope.addMap(myLatlng);
        $scope.addMarker(myLatlng);

        // Handles converting inputs and autocomplete then calls $scope.zipSearch(zipConverstion) with data to place markers
        $scope.input = document.getElementById("zipInput");
        var options = {
            types: ["address"],
            componentRestrictions: {
                country: "us"
            }
        };
        var autocomplete = new google.maps.places.Autocomplete($scope.input, options);
        google.maps.event.addListener(autocomplete,
            "place_changed",
            function() {
                var place = autocomplete.getPlace();
                for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        if (place.address_components[i].types[j] === "postal_code") {
                            var zipConverstion = parseInt(place.address_components[i].long_name);
                            document.getElementById("postal_code").innerHTML = zipConverstion;
                            console.log("zipConversion", zipConverstion);

                            $scope.clearMarkers();


                            $scope.zipSearch(zipConverstion);
                        }
                    }
                }
            });
        google.maps.event.addDomListener(window, "load");
        // zipSearch querys database for zipcodes with permits issued and adds markers to area
        $scope.zipSearch = function(zipcode) {
            //console.log("zipSearch Function called");
            $.ajax({
                url: `https://data.nashville.gov/resource/p5r5-bnga.json?zip=${zipcode}`,
                type: "GET",
                data: {
                    "$limit": 100,
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

                //Pagination Controls
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.q = "";

                $scope.numberOfPages = function () {
                    return Math.ceil($scope.data.length / $scope.pageSize);
                };
                for (var i = 0; i < 65; i++) {
                    $scope.data.push("Item " + i);
                }

                // FILTER FUNCITONS
                $scope.getData = function() {
                    return $filter("filter")($scope.data, $scope.q);
                };
        
                app.filter("startFrom",
                    function() {
                        return function(input, start) {
                            start = +start; //parse to int
                            return input.slice(start);
                        };
                    });

                //END PAGINATION

                for (var x in data) {
                    if (data.hasOwnProperty(x)) {
                        var permitIssued = data[x];
                        //console.log("permitIssued", permitIssued);
                        var coordinates = permitIssued.mapped_location;

                        if (!coordinates) continue;
                        //for (var y in permitIssued.mapped_location.coordinates) {
                        //    var permitLocations = permitIssued[y];
                        //}
                        var location = new google.maps.LatLng(permitIssued.mapped_location.coordinates[1],
                            permitIssued.mapped_location.coordinates[0]);

                        var marker = new google.maps.Marker({
                            position: location,
                            title: permitIssued.address,
                            map: $scope.map
                        });
                        //$scope.markers = [];
                        $scope.markers.push(marker);
                        console.log("markers", $scope.markers);
                        var myfunction = function(permit, marker) {
                            console.log("permit", permit);

                            return function() {
                                var contentString = '<div id="iw-container">' +
                                    `<div class="iw-title">${permit.address} <br> District : ${permit
                                    .council_dist}</div>` +
                                    '<div class="iw-content">' +
                                    `<div class="iw-subTitle">${permit.permit_type_description}  $${permit
                                    .const_cost}</div>` +
                                    `<div class="iw-subTitle"> ${permit.permit_subtype_description}</div>` +
                                    `<br><p>Purpose : ${permit.purpose} <br></p>` +
                                    '<div class="iw-subTitle">Contacts</div>' +
                                    `<p>${permit.date_issued}${permit.contact}<br>${permit.zip} ${permit
                                    .mapped_location_state}</p>` +
                                    `<br><div><input type="button" value="save" class="btn btn-default" ng-click="$scope.save('${permit}')"</div>` +
                                    '<div class="iw-bottom-gradient"></div>' +
                                    "</div>";

                                var infowindow = new google.maps.InfoWindow({
                                    content: contentString
                                });

                                console.log("marker hit");
                                infowindow.open($scope.map, marker);

                                $scope.map.setZoom(14);
                                $scope.map.setCenter(marker.getPosition());

                                marker.addListener("click",
                                    function() {
                                        infowindow.open(map, marker);
                                    });

                                google.maps.event.addListener($scope.map,
                                    "click",
                                    function() {
                                        infowindow.close();
                                    });

                                google.maps.event.addListener(infowindow,
                                    "domready",
                                    function() {
                                        var iwOuter = $(".gm-style-iw");
                                        var iwBackground = iwOuter.prev();
                                        iwBackground.children(":nth-child(2)").css({ 'display': "none" });
                                        iwBackground.children(":nth-child(4)").css({ 'display': "none" });
                                        iwOuter.parent().parent().css({ left: "115px" });
                                        iwBackground.children(":nth-child(1)")
                                            .attr("style",
                                                function(i, s) { return s + "left: 76px !important;" });
                                        iwBackground.children(":nth-child(3)")
                                            .attr("style",
                                                function(i, s) { return s + "left: 76px !important;" });
                                        iwBackground.children(":nth-child(3)").find("div").children()
                                            .css({
                                                'box-shadow': "rgba(72, 181, 233, 0.6) 0px 1px 6px",
                                                'z-index':
                                                    "1"
                                            });
                                        var iwCloseBtn = iwOuter.next();
                                        iwCloseBtn.css({
                                            opacity: "1",
                                            right: "38px",
                                            top: "3px",
                                            border: "7px solid #48b5e9",
                                            'border-radius': "13px",
                                            'box-shadow': "0 0 5px #3990B9"
                                        });
                                        if ($(".iw-content").height() < 140) {
                                            $(".iw-bottom-gradient").css({ display: "none" });
                                        }
                                        iwCloseBtn.mouseout(function() {
                                            $(this).css({ opacity: "1" });
                                        });
                                    });
                            };
                        };
                        marker.addListener("click", myfunction(permitIssued, marker));
                    }
                }
                google.maps.event.addDomListener(window, "load");
            });
        };

        $scope.newSearch = function() {

            console.log("New Search Function");
            $scope.deleteMarkers();
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
                .then(function (result) {
                    $scope.deleteFromPage(obj);

                    console.log("Save Function result", result);
                });
        };

        $scope.deleteFromPage = function (obj) {
            console.log("Delete From Page Function", obj);
        }
    }
]);

//$scope.loadMore = function(data) {
//    console.log("LoadMore function data", data);
//    page += 20;
//    $scope.zipSearch(data);
//};

//        $scope.zipSearch = function (zipcode) {
//            console.log(zipcode);
//            var zipNum = parseInt(zipcode);
//            console.log(zipNum);
//            console.log("query from input of $scope.zipQuery:", $scope.zipQuery);
//            $.ajax({
//                url:`https://data.nashville.gov/resource/p5r5-bnga.json?zip=${zipNum}`,
//                type: "GET",
//                data: {
//                    "$offset": page,
//                    "$$app_token": "txvTrGDA6QIe9HrEnzsO9ZEtt"
//                    // "$$app_token": "NASHVILLEDATA"
//                }
//            }).done(function(data) {
//                var list = [];
//                Object.keys(data).forEach(function(key) {
//                    var id = parseInt(page) + parseInt(key);
//                    data[key].id = id;
//                    list.push(data[key]);
//                });
//                $scope.data = $scope.data.concat(list);
//                $scope.$apply();
//                console.log("initial data return", data);
//            })
//        };


// Handles when the search button is clicked and what data is being passed
//$scope.search = function () {
//    console.log("query from input of $scope.query:", $scope.query);
//    GoogleFactory.getLocationItems($scope.map, $scope.query)
//        .then(function (result) {
//            console.log("result in GoogleController return from GoogleFactory", result);
//            $scope.map.setCenter(result[0].geometry.location);
//            var marker = new google.maps.Marker({
//                position: result[0].geometry.location,
//                map: $scope.map,
//                zoom: $scope.map.setZoom(12),
//                draggable: true,
//                title: "Click to zoom",
//                icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
//            });

//            var infowindow = new google.maps.InfoWindow({
//                content: result[0].formatted_address
//            });

//            marker.addListener("click",
//                function () {
//                    console.log("marker hit");
//                    infowindow.open($scope.map, marker);
//                    $scope.map.setZoom(18);
//                    $scope.map.setCenter(marker.getPosition());
//                });
//            console.log("marker in search Functions", marker);
//            console.log("result of input search button click", result);
//            var markers = result;
//            console.log("markers", markers);
//            //markers.setMap(null);

//        });
//};
//$scope.getNashData();

//var marker = new google.maps.Marker({
//    position: location,
//    map: $scope.map,
//    zoom: $scope.map.setZoom(12),
//    draggable: true,
//    title: "Click to zoom",
//    icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
//});


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


//        $scope.objects = [
//            { id: 1, name: "1st" }, { id: 2, name: "2nd" }, { id: 3, name: "3rd" },
//            { id: 4, name: "4th" }, { id: 5, name: "5th" }, { id: 6, name: "6th" },
//            { id: 7, name: "7th" }, { id: 8, name: "8th" }, { id: 9, name: "9th" },
//            { id: 10, name: "10th" }, { id: 11, name: "11th" }, { id: 12, name: "12th" }
//        ];
//
//        $scope.totalItems = $scope.objects.length;
//        $scope.currentPage = 1;
//        $scope.numPerPage = 5;
//
//        $scope.paginate = function (value) {
//            var begin = ($scope.currentPage - 1) * $scope.numPerPage;
//            var end = begin + $scope.numPerPage;
//            var index = $scope.objects.indexOf(value);
//            return (begin <= index && index < end);
//        };