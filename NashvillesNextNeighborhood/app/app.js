var app = angular.module("Authentication", ["ngRoute"]);
app.config([
    "$routeProvider", function($routeProvider) {
        console.log("appjs connected ");
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
            .when("/map",
            {
                templateUrl: "app/partials/Home.html",
                controller: "GoogleController"
            });
    }
]);