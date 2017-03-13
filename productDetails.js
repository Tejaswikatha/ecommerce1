angular.module("productDetails", [])
    .controller("detailsController", function ($scope, $http, $stateParams, $state) {
        var proinfo = JSON.parse($stateParams.details);
        $scope.name = proinfo.name;
        $scope.price = proinfo.price;
        $scope.image = proinfo.images.src;
        // $scope.proDetails = function (id) {
        console.log("id" + proinfo.model);

        // })
        $scope.cart = function () {


        }
        $scope.buy = function () {
            //console.log("Details" + model);
            $state.go("cartDetails"


            );

        }

    });
