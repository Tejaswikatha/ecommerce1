angular.module("productDetails", [])
    .controller("detailsController", function ($scope, $http, $stateParams, $state) {
        var proinfo = JSON.parse($stateParams.details);
        console.log(proinfo);
        // $scope.cartArray = [];
        var isPresentInCart;

        $scope.cartArray = JSON.parse(localStorage.getItem('cartInfo'));
        // console.log("dyfg" + $scope.cartArray.length);
        if (!$scope.cartArray)
            $scope.cartArray = [];
        // console.log($scope.cartArray);
        $scope.length = $scope.cartArray.length;

        for (var n = 0; n < $scope.cartArray.length; n++) {
            if ($scope.cartArray[n].id == proinfo.id) {
                isPresentInCart = true;
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
        //$scope.cartArray = JSON.parse(localStorage.getItem('cartInfo'));
        //console.log(JSON.stringify($scope.cartArray));


        $scope.addToCart = function () {


            for (var j = 0; j < $scope.cartArray.length; j++) {

                // console.log("arr" + $scope.cartArray);
                if (proinfo.id == $scope.cartArray[j].id) {
                    contains = true;
                    break;
                }

            }
            if (!contains) {
                $scope.cartArray.push(proinfo);
                //console.log("gain" + $scope.cartArray.length);
                // alert("your product hs added to the cart successfully");
                $scope.showAddCart = false;
                $scope.showRemoveCart = true;

                localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                $scope.length = $scope.cartArray.length;
                // console.log("length" + JSON.stringify(localStorage.length));
                alert("your product has added to the cart");
                // $stateParams.hide = false;

            } else {
                alert("the prduct has been added already");
                // $scope.length = $scope.cartArray.length;
                // $scope.showAddCart = false;
                // $scope.showRemoveCart = true;
            }


        }
        $scope.remove = function () {
            for (var k = 0; k < $scope.cartArray.length; k++) {
                if (proinfo.id == $scope.cartArray[k].id) {
                    $scope.cartArray.splice(k, 1);
                    localStorage.setItem('cartInfo', JSON.stringify($scope.cartArray));
                    $scope.length = $scope.cartArray.length;
                    //$stateParams.hide = true;
                    $scope.showAddCart = true;

                    $scope.showRemoveCart = false;

                    $scope.showRemoveCart = false;
                }


            }

        }




        $scope.buy = function () {
            console.log("Going to Cart Details");
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
