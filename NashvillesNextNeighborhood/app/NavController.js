"use strict";

app.controller("NavController", function ($scope, $location) {

    $scope.goToHome = () => {
        $location.url("/home");
    };

    $scope.goToMap = () => {
        $location.url("/map");
    };

    $scope.logout = () => {
        $location.url("/");
    };

});