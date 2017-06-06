app.controller("HomeController", ["$scope", "$http", "$location",
function ($scope, $http, $location,  $Map, $q) {
        $scope.data = [{1:1}];
        console.log("anything in HomeController");
    $scope.home = function() {

        $.ajax({
            url: "https://data.nashville.gov/resource/p5r5-bnga.json",
            type: "GET",
            data: {
                "$limit": 20,
                "$$app_token": "txvTrGDA6QIe9HrEnzsO9ZEtt"
            }
        }).done(function(data) {
            var items = [];
            Object.keys(data).forEach(function(key) {
                data[key].id = key;
                items.push(data[key]);
            });
            console.log(data);
            $scope.data = items;
            $scope.$apply();
            console.log(items);
        });


    };
    $scope.logout = function () {

        sessionStorage.removeItem('token');
        $http.defaults.headers.common['Authorization'] = "";

        $location.path("/login");
    }
    $scope.save = function (obj) {
        console.log("Save hitting", obj);
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
                "DescriptionOfBuild": obj.permit_type_description,
            }
        })
            .then(function (result) {
                console.log(result);
            });
        
    }

    }]);