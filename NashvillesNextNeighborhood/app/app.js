var app = angular.module("Authentication", ["ngRoute"]);

app.service("UserService",
    function () {
       this.nashDataLocation = null;
        //var users = ["sam", "mike", "bill"];
        //return {
        //    all: function() {
        //        return users;
        //    },
        //    first: function() {
        //        return users[0];
        //    },
        this.locationPass = function (location) {
                console.log("location in app.js from pass in homecontroller", location);
                this.nashDataLocation = location;
        }
    
});


app.config([
    "$routeProvider", function($routeProvider) {
        //console.log("appjs connected ");
        $routeProvider.when("/",
            {
                templateUrl: "app/partials/Login.html",
                controller: "LoginController"
            })
            .when("/signup",
            {
                templateUrl: "app/partials/SignUp.html",
                controller: "SignUpController"
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