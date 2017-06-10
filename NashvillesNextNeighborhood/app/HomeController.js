"use strict";
app.controller("HomeController", 
    //["$scope", "$http", "$location"]
    function ($scope, $rootScope, $http, $location, UserService) {
        var page = 0;
        $scope.data = [];
        $scope.zipcode = "";

        $scope.firstUser = UserService.first();

        //console.log("anything in HomeController");

        $scope.home = function() {
            console.log("Home Function");
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
                console.log("initial data return",data);
            });
        };

        $scope.loadMore = function (data) {
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
                    console.log("Save Function result",result);
                });
        };

        $scope.loadOnMap = function (obj) {
            console.log("LoadOnMap Function", obj);
            var location = {
                lat: obj.mapped_location.coordinates[0],
                lng: obj.mapped_location.coordinates[1]
            }
            console.log("location in HomeController", location);
            $scope.passLocationToService = UserService.locationPass(location);
            //GoogleContoller.addMarkerFromNashData(location);
        } 
    }
);
