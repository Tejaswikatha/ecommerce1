angular.module("productDetails", [])
    .controller("detailsController", function ($scope, $http, $stateParams, $state) {
        var proinfo = JSON.parse($stateParams.details);
        console.log(proinfo);

        var isPresentInCart;

        $scope.cartArray1 = JSON.parse(localStorage.getItem('cartInfo'));
        for (var n = 0; n < $scope.cartArray1.length; n++) {
            if ($scope.cartArray1[n]._id == proinfo._id) {
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
        $scope.model = proinfo.model;
        $scope.make = proinfo.make;
        $scope.price = proinfo.price;
        $scope.image = proinfo.picture;

        var contains = false;
        $scope.related = [];
        $scope.cartArray = JSON.parse(localStorage.getItem('cartInfo'));
        //console.log(JSON.stringify($scope.cartArray));
        if (!$scope.cartArray)
            $scope.cartArray = [];
        // console.log($scope.cartArray);
        $scope.length = $scope.cartArray.length;


        $scope.addToCart = function () {
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

        $scope.similar = function (makename) {
            $http.get("vehicles.json")
                .then(function (response) {
                    var products = response.data.products;
                    console.log("value" + JSON.stringify(products[0].make));
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].make == makename) {
                            $scope.related.push(products[i]);
                        }
                    }

                });

        }
    });
