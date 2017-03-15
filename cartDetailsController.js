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
        $scope.cart = [];
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
        var total = 0;
        for(var i=0; i< $scope.cart.length;i++){
            console.log($scope.cart[i].price);
            $scope.quantityNumber = document.getElementById("n2").value;
            console.log($scope.quantityNumber);
            total += (parseInt($scope.cart[i].price) * parseInt($scope.quantityNumber));
        }
        return total;
        }

    $scope.isInvalid = function (field) {
        return $scope.sampleForm[field].$invalid && $scope.sampleForm[field].$dirty;
    };

    $scope.isValid = function (field) {
        return $scope.sampleForm[field].$valid && $scope.sampleForm[field].$dirty;
    };

});
