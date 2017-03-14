angular.module("productDetails", [])
    .controller("detailsController", function ($scope, $http, $stateParams, $state) {
        var proinfo = JSON.parse($stateParams.details);
        console.log(proinfo);
        $scope.cartArray = [];
        var isPresentInCart;

        $scope.cartArray1 = JSON.parse(localStorage.getItem('cartInfo'));
        if ($scope.cartArray.length > 0) {
            for (var n = 0; n < $scope.cartArray1.length; n++) {
                if ($scope.cartArray1[n]._id == proinfo._id) {
                    isPresentInCart = true;
                }
            }
        }
        if (isPresentInCart) {
            console.log("Contains in cart")
            $scope.showAddCart = false;
            $scope.showRemoveCart = true

        } else {
            console.log("Not contains")
            $scope.showAddCart = true;
            $scope.showRemoveCart = false

        }

        //console.log("devi" + JSON.stringify(proinfo));
        $scope.name = proinfo.name;
        $scope.price = proinfo.price;
        $scope.price1 = proinfo.regular_price;
        //  $scope.image = proinfo.picture;

        var contains = false;
        $scope.related = [];
        $scope.cartArray = JSON.parse(localStorage.getItem('cartInfo'));
        //console.log(JSON.stringify($scope.cartArray));
        if (!$scope.cartArray)
            $scope.cartArray = [];
        // console.log($scope.cartArray);
        $scope.length = $scope.cartArray.length;


        $scope.addToCart = function () {
            if ($scope.cartArray.length == 0) {
                $scope.cartArray.push(proinfo);
            }

            for (var j = 0; j < $scope.cartArray.length; j++) {

                // console.log("arr" + $scope.cartArray);
                if (proinfo._id == $scope.cartArray[j]._id) {
                    contains = true;
                    break;
                }

            }
            if (!contains) {
                $scope.cartArray.push(proinfo);
                console.log("gain" + $scope.cartArray.length);
                $scope.length = $scope.cartArray.length;


                localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                console.log("length" + JSON.stringify(localStorage.length));
                alert("your product has added to the cart");
                $stateParams.hide = false;
                $scope.showAddCart = false;
                $scope.showRemoveCart = true

            } else {
                alert("the prduct has been added already");
            }


        }
        $scope.remove = function () {
            for (var k = 0; k < $scope.cartArray.length; k++) {
                if (proinfo._id == $scope.cartArray[k]._id) {
                    $scope.cartArray.splice(k, 1);
                    localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                    $scope.length = $scope.cartArray.length;
                    $stateParams.hide = true;
                    $scope.showAddCart = true;
                    $scope.showRemoveCart = false
                    s
                }
            }

        }




        $scope.buy = function () {
            //console.log("Details" + model);
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
