angular.module("products", [])
    .controller("productsController", function ($scope, $http, $state) {
        $scope.products1 = [];
        $scope.curPage = 0;
        $scope.pageSize = 9;
        var au = window.btoa("ck_639e1b2d855aa23eba3b7bae585c7da4690d4f8a:cs_4f1eb33d7c3ff1f621df9973add39fe0dcecfc27"),
            headers = {
                "Authorization": "Basic " + au
            };
        $http.get(" https://www.colourssoftware.com/wordpress/wp-json/wc/v1/products", {
                headers: headers
            })
            .then(function (response) {
                console.log("hii" + JSON.stringify(response));
                $scope.products1 = response.data;
                //console.log(response)
                //console.log("hi" + JSON.stringify($scope.products1));
                $scope.noOfPages();
            })
            .catch(function (response) {
                console.log(response)
            });
        $scope.noOfPages = function () {
            // console.log(x);
            //console.log("hi" + $scope.products1);
            return Math.ceil($scope.products1.length / $scope.pageSize);
        }
        $scope.proDetails = function (id) {
            //console.log("id" + JSON.stringify(id));
            $state.go("productDetails", {
                details: id.id
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
