var app = angular.module("Authentication", ["ngRoute"]);
console.log("working");
app.config([
    "$routeProvider", function($routeProvider) {
        console.log("appjs ");
        $routeProvider.when("/",
            {
                templateUrl: "app/partials/Authorization.html",
                controller: "AuthorizationController"
            })
            .when("/home",
            {
                templateUrl: "app/partials/Home.html",
                controller: "HomeController"
            })
            .when("/signup",
            {
                templateUrl: "app/partials/SignUp.html",
                controller: "SignUpController"
            });
    }
]);