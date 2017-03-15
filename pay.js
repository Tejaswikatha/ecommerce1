var myapp = angular.module("payDetails", [])
    .controller("payCtrl", function ($scope, $stateParams, $state, $http) {
        var paypalvar = JSON.parse($stateParams.paymentData);
        console.log(JSON.parse($stateParams.paymentData));

        console.log("hi" + JSON.stringify(paypalvar));

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

        /* $scope.dataobj= {
            var nameval= $scope.payy.name,
             var priceval=$scope.payy.price, "payer": {
                    "payment_method": "paypal"
                },

                "transactions": [
                    {
                        "amount": {
                            "total": $scope.totalcost,
                            "currency": "USD"
                        }
        }]
                "shipping_address": {
                    "recipient_name": "Srujana Pusapudi",
                    "line1": "4th Floor",
                    "line2": "Unit #34",
                    "city": "San Jose",
                    "state": "CA",
                    "phone": "011862212345678",
                    "postal_code": "50002",
                    "country_code": "US"
                }
         };*/



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
                console.log("hiiii" + client);
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
                    console.log("da " + JSON.stringify(data));
                    alert("Your payment was successfull!!\n" + "Payment Details:\n" + "Total:" + $scope.totalcost + "USD");
                    // Show a success page to the buyer
                });

            }

        };


        //transaction details
        /*var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var auth = window.btoa("ck_639e1b2d855aa23eba3b7bae585c7da4690d4f8a:cs_4f1eb33d7c3ff1f621df9973add39fe0dcecfc27"),
            headers = {
                "Authorization": "Basic " + auth
            };
        $http.post("https://www.colourssoftware.com/wordpress/wp-json/wc/v1/products", dataobj, config).then(function (response) {
                headers: headers,

            },
            if (response.data)
                $scope.msg = "Post data submitted successfully";

            function (response) {
                $scope.msg = "Service not exists";
                $scope.statusval = response.status;
                $scope.statustext = response.statusText;
            })*/

    });
