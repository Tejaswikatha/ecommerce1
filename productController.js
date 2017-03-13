angular.module("products", [])
    .controller("productsController", function ($scope, $http, $state) {
        $scope.products1 = [];
        $scope.curPage = 0;
        $scope.pageSize = 9;
        var au = window.btoa("ck_29b4d149bb885a7c81597b217a74a7002f6d8001:cs_89414dbabbf145fefd2e112cf4f51c7b7b390699"),
            headers = {
                "Authorization": "Basic " + au
            };
        $http.get(" https://www.colourssoftware.com/wordpress/wp-json/wc/v1/products", {
                headers: headers
            })
            .then(function (response) {
                /*console.log("hii" + JSON.stringify(response));*/
                $scope.products1 = response.data;
                //console.log(response)
                //console.log("hi" + JSON.stringify($scope.products1));
                $scope.noOfPages();
            });
        $scope.noOfPages = function () {
            // console.log(x);
            //console.log("hi" + $scope.products1);
            return Math.ceil($scope.products1.length / $scope.pageSize);
        }
        $scope.proDetails = function (id) {
            //console.log("id" + JSON.stringify(id));
            $state.go("productDetails", {
                details: JSON.stringify(id)
            });
        }
    })
    .filter("pagination", function () {
        return function (input, start) {
            // console.log("hi" + input);
            // console.log("hi" + start);
            start = +start;
            // console.log("hi" + start);
            return input.slice(start);
        };
    });
