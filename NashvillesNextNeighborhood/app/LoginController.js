app.controller("LoginController",
[
    "$scope", "$http", "$location", function ($scope, $http, $location) {
        //$scope.username = "";
        //$scope.password = "";
        $scope.username = "a@d.com";
        $scope.password = "123456Aa!";

        $scope.login = function () {
            $http({
                method: "POST",
                url: "/Token",
                headers: { 'Content-Type': "application/x-www-form-urlencoded" },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: { grant_type: "password", username: $scope.username, password: $scope.password }
            })
                .then(function (result) {
                    //console.log("result of Login = ", result);

                    sessionStorage.setItem("token", result.data.access_token);
                    $http.defaults.headers.common["Authorization"] = `bearer ${result.data.access_token}`;
                    $location.path("/home");
                });
        };
    }
]);