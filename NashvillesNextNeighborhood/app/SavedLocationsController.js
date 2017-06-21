"use strict";
app.controller("SavedLocationsController",
    function ($scope, $rootScope, $location, mapService, $http) {
        var list = [];
        $scope.getSavedData = function() {
            $http({
                method: "GET",
                url: "api/Get/Result"
            }).then(function successCallback(response) {
                    console.log("success", response);
                    $scope.response = response.data;
                    console.log("$scope.response", $scope.response);
                },
                function errorCallback(response) {
                    console.log("error", response);
                });
        };
        $scope.getSavedData();

        $scope.delete = function(id) {
            $http({
                method: "DELETE",
                url:`api/Delete/Result/${id}`
            }).then(function successCallback(response) {
                console.log("success", response);
                $scope.getSavedData();

            },
                function errorCallback(response) {
                    console.log("error", response);
                });
        }

        $scope.showOnMapFromSave = function (id) {
            $scope.callToShowDataOnMap(id);
            console.log("callToShowDataOnMap hit", id);
            
            $location.url("/home");
        }

        $scope.callToShowDataOnMap = function (id) {
            mapService.addMarkerToService(id);
        };



    });
   