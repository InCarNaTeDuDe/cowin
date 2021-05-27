(function () {
  "use strict";
  var app = angular.module("myApp", ["ngRoute"]);

  app.config(function ($routeProvider) {
    $routeProvider.when("/", {
      controller: "HomeController",
      templateUrl: "views/home.html",
      // resolve: {
      //   productTypes: [
      //     "AP_Districts",
      //     function (initializeDistrictsOfAP) {
      //       return initializeDistrictsOfAP.get();
      //     },
      //   ],
      // },
    });
  });

  app.factory("initializeDistrictsOfAP", [
    "$http",
    "$q",
    "$filter",
    function ($http, $q, $filter) {
      return {
        get: function () {
          return $http({
            method: "GET",
            url: "https://cdn-api.co-vin.in/api/v2/admin/location/districts/2",
          }).then(
            function (response) {
              if (response.data) return response.data;
            },
            function (response) {
              alert(response.message);
            }
          );
        },
      };
    },
  ]);
})();
