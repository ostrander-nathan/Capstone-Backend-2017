﻿var app = angular.module("Authentication", ["ngRoute"]);

app.service('mapService', function () {
    var markerList = null;

    var addMarkerToService = function (newObj) {
        markerList = newObj;
        console.log("markerList is mapservice", markerList);
    };

    var getMarkerLocation = function () {
        return markerList;
    };

    return {
        addMarkerToService: addMarkerToService,
        getMarkerLocation: getMarkerLocation
    };

});



app.config([
    "$routeProvider", function($routeProvider) {
        //console.log("appjs connected ");
        $routeProvider.when("/",
            {
                templateUrl: "app/partials/Login.html",
                controller: "LoginController"
            })
            .when("/home",
            {
                templateUrl: "app/partials/Home.html",
                controller: "HomeController"
            })
            .when("/saved",
            {
                templateUrl: "app/partials/SavedLocations.html",
                controller: "SavedLocationsController"
            });
    }
]);