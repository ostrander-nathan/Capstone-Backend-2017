var app = angular.module("Authentication", ["ngRoute"]);

app.factory("UserService",
    function() {
        var users = ["sam", "mike", "bill"];
        return {
            all: function() {
                return users;
            },
            first: function() {
                return users[0];
            },
            locationPass: function (location) {
                console.log("location in app.js to pass to googleController", location);
                return location;
        }
    }
});

    //function() {
    //    console.log("Getting hit in GoogleFactory from HomeController", location);
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
    //    return {
    //        addMarkerFromNashData
    //    }
    //    $scope.$apply();;
   // });
  
        
       



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