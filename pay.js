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
        var values = {};
        for (var i = 0; i < paypalvar.length; i++) {
            $scope.nameval = paypalvar[i].name;
            $scope.priceval = paypalvar[i].price;
            console.log("hello" + $scope.na)
            values = {
                productName: $scope.nameval,
                productPrice: $scope.priceval
            }
        }
        console.log("hi" + JSON.stringify(values))
        console.log('Srujana' + values.productName);
        //data
        $scope.productData = {
            order: {
                /*payment_details: {
                    method_id: 'bacs',
                    method_title: 'Direct Bank Transfer',
                    paid: true
                },
                billing: {
                    product_name: values.name,
                    product_price: values.price,
                    product_id: "8",
                    total: $scope.totalcost,
                    currency: "USD"
                },

                shipping_address: {
                    recipient_name: 'Srujana Pusapudi',
                    address_1: "4th Floor",
                    address_2: "Unit #34",
                    city: "San Jose",
                    state: "CA",
                    postcode: "50002",
                    country: "US"
                }
            }*/
                payment_details: {
                    method_id: 'bacs',
                    method_title: 'Direct Bank Transfer',
                    paid: true
                },
                billing_address: {
                    first_name: 'John',
                    last_name: 'Doe',
                    address_1: '969 Market',
                    address_2: '',
                    city: 'San Francisco',
                    state: 'CA',
                    postcode: '94103',
                    country: 'US',
                    email: 'john.doe@example.com',
                    phone: '(555) 555-5555'
                },
                shipping_address: {
                    first_name: 'John',
                    last_name: 'Doe',
                    address_1: '969 Market',
                    address_2: '',
                    city: 'San Francisco',
                    state: 'CA',
                    postcode: '94103',
                    country: 'US'
                },
                customer_id: 2,
                line_items: [
                    {
                        product_id: 546,
                        quantity: 2
      },
                    {
                        product_id: 613,
                        quantity: 1,
                        variations: {
                            pa_color: 'Black'
                        }
      }
    ],
                shipping_lines: [
                    {
                        method_id: 'flat_rate',
                        method_title: 'Flat Rate',
                        total: 10
      }
    ]
            }

        };

        $scope.dataObj = [];
        $scope.dataObj.push(JSON.stringify($scope.productData));

        console.log("hello" + $scope.dataObj)
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
                    $scope.dataval = JSON.stringify(data.paymentID);
                    console.log("hi" + $scope.dataval);
                    $scope.transactionDetails($scope.dataval);
                    alert("Your payment was successfull!!\n" + "Payment Details:\n" + "Total:" + $scope.totalcost + "USD");
                    // Show a success page to the buyer
                });

            }


        };


        //transaction details
        $scope.transactionDetails = function (val) {
            $scope.paymentId = val;
            if ($scope.paymentId) {
                $scope.dataObj.push($scope.paymentId);
                $scope.ack = "success";
                $scope.dataObj.push($scope.ack);
            } else {
                $scope.ack = "Fail";
                $scope.dataObj.push($scope.ack);
            }
            console.log("hello" + $scope.dataObj)
            var au = window.btoa("ck_639e1b2d855aa23eba3b7bae585c7da4690d4f8a:cs_4f1eb33d7c3ff1f621df9973add39fe0dcecfc27"),
                result = {
                    method: 'POST',
                    url: "https://www.colourssoftware.com/wordpress/wp-json/wc/v1/orders",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'Authorization': "Basic " + au
                    },
                    data: $scope.dataObj
                }
            $http(result).then(function (response) {
                    console.log(response)
                        /*if (response.data)
                            $scope.msg = "Post data submitted successfully";*/

                },
                function (response) {
                    console.log(response)
                        /*$scope.msg = "Service not exists";
                        $scope.statusval = response.status;
                        $scope.statustext = response.statusText;*/
                });


        }


    });
