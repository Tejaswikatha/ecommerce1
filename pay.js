var myapp = angular.module("payDetails", [])
    .controller("payCtrl", function ($scope, $stateParams, $state) {
        var paypal = JSON.parse($stateParams.payment1);
        var totalcost = 0;

        $scope.payy = paypal;
        console.log("pay " + JSON.stringify($stateParams))
        $scope.value = "Continue";
        $scope.continue = function () {
            $scope.continuepay = !$scope.continuepay;

            if ($scope.continuepay)
                $scope.value = "Hide";
            else
                $scope.value = "Continue";
        };
        $scope.home = function () {

            $state.go("products");
        };
        $scope.back = function () {
                $state.go("cartDetails", {
                    cart: $stateParams.payment1
                });

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
                                total: '10.00',
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



        $scope.confirm = function () {
            alert("Your order is confirmed");
        };
        $scope.confirmfn = function () {
            if (!$scope.debitcard) {
                $scope.err1 = "Enter valid card number";
            }
            if (!$scope.monthval) {
                $scope.err2 = "Enter valid expiry date";
            }
            if (!$scope.namecardval) {
                $scope.err3 = "Enter valid card name";
            } else {
                alert("Your order is confirmed");
            }
        }
        $scope.show = function () {
            if (!$scope.captchaval) {
                $scope.err = "Please enter valid captcha code";
            } else {
                alert("Your order is confirmed");
            }
        }


        //total cost function
        $scope.totalcost = 0;
        $scope.total = function () {

                for (var i = 0; i < paypal.length; i++) {
                    $scope.totalcost = $scope.totalcost + parseInt(paypal[i].cost);
                    console.log("pay " + $scope.totalcost)
                }
            }
            //total cost
        $scope.remove = function (name, cost) {

            var index = -1;
            var arr = eval($scope.payy);
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].cost == cost) {
                    index = j;
                    break;
                }
                if (index === -1) {
                    alert("error");
                }
            }
            console.log(index);
            $scope.payy.splice(index, 1);
            $scope.totalcost = $scope.totalcost - cost;

            console.log("pay " + $scope.totalcost)

        };

        $scope.total();



    });
