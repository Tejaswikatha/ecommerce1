var appCartDetails = angular.module('cartModule', []);
appCartDetails.controller('cartDetailsController', function ($scope, $stateParams, $state) {
    console.log($stateParams)
    var cartinfo = JSON.parse($stateParams.cart);
    console.log("info " + JSON.stringify(cartinfo));
    $scope.cart = cartinfo;

    $scope.onRemove = function (index) {
        $scope.cart.splice(index, 1)
    }

//    $scope.getTotal = function () {
//        var total = 0;
//        for (var i = 0; i < $scope.cart.length; i++) {
//            total += parseInt($scope.cart[i].price);
//        }
//        return total;
//    }

    $scope.clearItems = function () {
        $scope.cart = {};
    }

    $scope.clickAdd = function () {

        $state.go("products", {
            detail: JSON.stringify($scope.cartinfo)
        });
    }


    $scope.clickPay = function () {
        console.log(JSON.stringify($scope.cartinfo));
        $state.go("paymentDetails", {
            paymentData: JSON.stringify($scope.cart)
        });
    }
    $scope.addDetail = function () {
        myObject = {};
        myObject.name = getElementByValue("name");
        myObject.mobileno = getElementByValue("mobileno");
        myObject.emailid = getElementByValue("emailid");
        myObject.address = getElementByValue("address");
        myObject.pincode = getElementByValue("pincode");
        $scope.myArray.push(myObject);
    }

    $scope.showdetails = function () {
        var userDetails = [];
        myObject = {};
        myObject.fname = $scope.name;
        myObject.mobile = $scope.mobileno;
        myObject.email = $scope.emailid;
        myObject.add = $scope.address;
        myObject.pcode = $scope.pincode;
        userDetails.push(myObject);
        console.log(userDetails);
        localStorage.setItem('finalUserDetails', JSON.stringify(userDetails));
        var getUserDetails = JSON.parse(localStorage.getItem('finalUserDetails'));
        //localStorage.clear();
    }

    $scope.getTotal1 = function() {
//        $scope.total = 0;
//        for(var i=0; i<$scope.cart.length; i++){
//      $scope.total += document.getElementsByClassName("n3").value;
//            console.log("total" +$scope.total)
//            var cellObjs = document.getElementsByClassName("n3");
//        console.log(cellObjs);
        var totalPrice = document.getElementsByClassName("total-Price");
        var i, priceText, grandTotal=0;
        for(i = 0; i < totalPrice.length; i++)
            {
                var x = JSON.stringify(totalPrice[i].innerHTML);
                console.log("hi" +x);
                priceText = parseInt(totalPrice[i].innerHTML);
                grandTotal += (priceText);
                console.log("hi" +grandTotal);
            }
            return grandTotal;
//                var sum = 0;
//         var cells = document.querySelectorAll("td:nth-of-type(4)");
//                for(var i=0; i < cells.length; i++){
//                    sum += parseFloat(cells[i].firstChild.data);
//                    console.log("sum " +sum);
//                }
//                return sum;
              //  document.getElementById('totalCont').innerHTML = 'Total: '+sum;
            }
//            $scope.quantityNumber = document.getElementById("n3").value;
//            console.log($scope.cart[i]);
//
//            var newPrice = $scope.cart[i];
//
//            if($scope.cart.name == name){
//              total += (parseInt($scope.quantityNumber) * parseInt(newPrice.price));
//            }

//        }
//        return $scope.total;
//        }

    $scope.isInvalid = function (field) {
        return $scope.sampleForm[field].$invalid && $scope.sampleForm[field].$dirty;
    };

    $scope.isValid = function (field) {
        return $scope.sampleForm[field].$valid && $scope.sampleForm[field].$dirty;
    };

});
