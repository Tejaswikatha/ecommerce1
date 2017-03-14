var myapp = angular.module("payDetails", [])
    .controller("payCtrl", function ($scope, $stateParams, $state) {
        var paypalvar = JSON.parse($stateParams.paymentData);
        console.log(JSON.parse($stateParams.paymentData));

        console.log("hi" + JSON.stringify(paypalvar));
        $scope.payment1 = paypalvar;
        var totalcost = 0;
        $scope.payy = paypalvar;
        console.log("pay " + JSON.stringify($stateParams))
            //total cost function
        $scope.totalcost = 0;
        $scope.total = function () {

            for (var i = 0; i < paypalvar.length; i++) {
                $scope.totalcost = $scope.totalcost + parseInt(paypalvar[i].price);
                console.log("pay " + $scope.totalcost)
            }
        }
        $scope.total();

        //continue function
        $scope.value = "Continue";
        $scope.continue = function () {
            if ($scope.totalcost != 0) {
                $scope.continuepay = !$scope.continuepay;

                if ($scope.continuepay)
                    $scope.value = "Hide";
                else
                    $scope.value = "Continue";
            } else {
                alert("Your cart is empty!!!");
            }
        };
        //home function
        $scope.home = function () {

            $state.go("products");
        };
        //back function
        $scope.back = function () {
            $state.go("cartDetails", {
                cart: $stateParams.paymentData
            });
        }




        //total cost
        $scope.remove = function (name, price) {

            var index = -1;
            var arr = eval($scope.payy);
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].price == price) {
                    index = j;
                    break;
                }

            }
            console.log(index);
            $scope.payy.splice(index, 1);
            $scope.totalcost = $scope.totalcost - price;

            console.log("pay " + $scope.totalcost)

        };
        $scope.message = function () {
            alert("Your payment was successfull")
        }

        //paypal function
        $scope.opts = {
            env: 'sandbox',
            client: {
                sandbox: 'ARirhWN8nmzGzlDqTMPJ39rJ17JHJPMTq1FarTsPDZTKV2UaCmAq-E0ZQM1lEiP6tg6av13d7sAtAqCt',
                production: 'pusapudisrujanadevi-facilitator@gmail.com'
            },
            payment: function () {
                var env = this.props.env;
                console.log("hi" + env);
                var client = this.props.client;
                return paypal.rest.payment.create(env, client, {
                    transactions: [
                        {
                            amount: {
                                total: $scope.totalcost,
                                currency: 'USD'
                            }
                        }
                    ]
                });
            },
            commit: true, // Optional: show a 'Pay Now' button in the checkout flow
            onAuthorize: function (data, actions) {
                // Optional: display a confirmation page here
                return actions.payment.execute().then(function () {
                    // Show a success page to the buyer
                });
            }

        };

    });
