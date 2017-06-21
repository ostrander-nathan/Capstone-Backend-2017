//app.controller("SignUpController", ["$scope", "$http", "$location",
//    function ($scope, $http, $location) {
//        $scope.Email = "a@d.com",
//            $scope.Password = "123456Aa!",
//            $scope.ConfirmPassword = "123456Aa!";
//
//        $scope.signUp = function() {
//
//            $http({
//                    url: "/api/Account/Register",
//                    method: "POST",
//                    data: {
//                        "Email": $scope.Email,
//                        "Password": $scope.Password,
//                        "ConfirmPassword": $scope.ConfirmPassword
//                    }
//                })
//                .then(function(result) {
//                    console.log(result);
//                });
//
//            $location.path("/login");
//        };
//    }]);