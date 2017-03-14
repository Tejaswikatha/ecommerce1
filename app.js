angular.module("ecommerceModule", ["products", "productDetails", "ui.router", "paypal-button", "cartModule"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/products");
        $stateProvider.state("products", {
                url: "/products",
                templateUrl: "products.html",
                controller: "productsController"
            })
            .state("productDetails", {
                url: "/productDetails/:details",
                templateUrl: "productDetails.html",
                controller: "detailsController"
            })
            .state("cartDetails", {
                url: "/cartDetails",
                templateUrl: "cartDetais.html"
            })
            .state("paymentDetails", {
                url: "/paymentDetails/:payment1",
                templateUrl: "pay.html"
            });
    });
