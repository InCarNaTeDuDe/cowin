!(function () {
  "use strict";

  angular
    .module("myApp")
    .controller(
      "HomeController",
      function ($scope, $http, $filter, AP_Districts) {
        "use strict";

        const TODAY = $filter("date")(Date.now(), "dd-MM-yyyy");

        $scope.vaccineCenters = [];
        $scope.selectedDistrict = {};
        $scope.showText = false;
        // $scope.districts = AP_Districts;

        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/2")
          .then((x) => x.json())
          .then((d) => ($scope.districts = d.districts));

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
      }
    );
})();
