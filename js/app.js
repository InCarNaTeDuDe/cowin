(function () {
  "use strict";
  var app = angular.module("myApp", ["ngRoute"]);

  app.config(function ($routeProvider) {
    $routeProvider.when("/", {
      controller: "HomeController",
      templateUrl: "views/home.html",
    });
  });
})();
