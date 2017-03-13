angular.module("ecommerceModule", ["products", "productDetails", "ui.router"])
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
                templateUrl: "cartDetails.html"
            })
            .state("paymentDetails", {
                url: "/paymentDetails",
                templateUrl: "pay.html"
            });
    });
