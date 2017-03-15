angular.module("productDetails", [])
    .controller("detailsController", function ($scope, $http, $stateParams, $state) {
        var proinfo = $stateParams.details;
        var isPresentInCart;
        var products;
        var au = window.btoa("ck_639e1b2d855aa23eba3b7bae585c7da4690d4f8a:cs_4f1eb33d7c3ff1f621df9973add39fe0dcecfc27"),
            headers = {
                "Authorization": "Basic " + au
            };
        $http.get(" https://www.colourssoftware.com/wordpress/wp-json/wc/v1/products", {
                headers: headers
            })
            .then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    if (proinfo == response.data[i].id) {
                        $scope.id = response.data[i].id;
                        $scope.name = response.data[i].name;
                        $scope.price = response.data[i].price;
                        $scope.price1 = response.data[i].regular_price;

                        products = ({
                            id: $scope.id,
                            name: $scope.name,
                            price: $scope.price,
                            price1: $scope.price1
                        })
                    }

                }
            })

        $scope.cartArray = JSON.parse(localStorage.getItem('cartInfo'));
        if (!$scope.cartArray)
            $scope.cartArray = [];
        $scope.length = $scope.cartArray.length;
        if ($scope.cartArray.length) {
            for (var n = 0; n < $scope.cartArray.length; n++) {
                if (proinfo == $scope.cartArray[n].id) {
                    isPresentInCart = true;
                }
            }
        }
        if (isPresentInCart) {
            $scope.showAddCart = false;
            $scope.showRemoveCart = true

        } else {
            $scope.showAddCart = true;
            $scope.showRemoveCart = false
        }
        var contains = false;
        $scope.related = [];
        $scope.addToCart = function () {
            for (var j = 0; j < $scope.cartArray.length; j++) {
                if (proinfo == $scope.cartArray[j].id) {
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                $scope.cartArray.push(products);
                $scope.showAddCart = false;
                $scope.showRemoveCart = true;
                localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                $scope.length = $scope.cartArray.length;

                alert("your product has added to the cart");
            } else {
                alert("the prduct has been added already");
                $scope.length = $scope.cartArray.length;
                $scope.showAddCart = false;
                $scope.showRemoveCart = true;
            }

        }
        $scope.remove = function () {
            for (var k = 0; k < $scope.cartArray.length; k++) {
                if (proinfo == $scope.cartArray[k].id) {
                    $scope.cartArray.splice(k, 1);
                    localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                    $scope.length = $scope.cartArray.length;
                    $scope.showAddCart = true;
                    $scope.showRemoveCart = false;
                }
            }
        }
        $scope.buy = function () {
            $state.go("cartDetails", {
                cart: JSON.stringify($scope.cartArray)
            });
        }
        $scope.back = function () {
            $state.go("products");
        }

        $scope.similar = function (name) {
            var au1 = window.btoa("ck_639e1b2d855aa23eba3b7bae585c7da4690d4f8a:cs_4f1eb33d7c3ff1f621df9973add39fe0dcecfc27"),
                headers = {
                    "Authorization": "Basic " + au
                };
            $http.get(" https://www.colourssoftware.com/wordpress/wp-json/wc/v1/products", {
                    headers: headers
                })
                .then(function (response) {

                    $scope.products2 = response.data;
                    for (var i = 0; i < products2.length; i++) {
                        if (products2[i].name == name) {
                            $scope.related.push(products2[i]);
                        }
                    }
                });
        }
    });
