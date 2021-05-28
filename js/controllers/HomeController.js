!(function () {
  "use strict";

  angular
    .module("myApp")
    .controller("HomeController", function ($scope, $http, $filter) {
      "use strict";

      const TODAY = $filter("date")(Date.now(), "dd-MM-yyyy");

      $scope.vaccineCenters = [];
      $scope.selectedDistrict = {};
      $scope.showText = false;

      $scope.districts = [
        { district_id: 9, district_name: "Anantapur" },
        { district_id: 10, district_name: "Chittoor" },
        { district_id: 11, district_name: "East Godavari" },
        { district_id: 5, district_name: "Guntur" },
        { district_id: 4, district_name: "Krishna" },
        { district_id: 7, district_name: "Kurnool" },
        { district_id: 12, district_name: "Prakasam" },
        { district_id: 13, district_name: "Sri Potti Sriramulu Nellore" },
        { district_id: 14, district_name: "Srikakulam" },
        { district_id: 8, district_name: "Visakhapatnam" },
        { district_id: 15, district_name: "Vizianagaram" },
        { district_id: 16, district_name: "West Godavari" },
        {
          district_id: 6,
          district_name: "YSR District, Kadapa (Cuddapah)",
        },
      ];

      function getVaccineCentersByDistrict(id) {
        $http
          .get(
            "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=" +
              id +
              "&date=" +
              TODAY
          )
          .then((d) => {
            if (d.data.centers && d.data.centers.length) {
              d.data.centers.forEach((ctr) => {
                ctr.sessions.forEach((session) => {
                  session.slots = session.slots.join("\n");
                });
              });
              $scope.vaccineCenters = d.data.centers || [];
            }
          });
      }

      $scope.listCentersByDistrict = function (id) {
        const districtChoosen = JSON.parse(id);
        $scope.showText = districtChoosen.district_name;
        getVaccineCentersByDistrict(districtChoosen.district_id);
      };

      $scope.toggle = function (id) {
        var divId = id++;
        var selector = "#collapse-" + divId;

        angular.element(".collapse.in").removeClass("in");

        if (angular.element(selector).hasClass("in")) {
          angular.element(selector).removeClass("in");
        } else {
          angular.element(selector).addClass("in");
        }
      };
    });
})();
