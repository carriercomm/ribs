angular.module('ribs.controller.part', []).controller('PartController', ['$scope', 'Parts', function($scope, Parts) {
    $scope.newPart = {};

    Parts.get()
      .success(function(data) {
        $scope.parts = data;
      });

    $scope.createPart = function(form) {
      Parts.create($scope.newPart)
        .success(function(data) {
          if (data.error) {
            for (var key in data.error.errors) {
              form[key].$error.mongoose = data.error.errors[key].message;
            }
          } else {
            $scope.newPart = {};
            $scope.parts = data;
          }
        });
    };

    $scope.deletePart = function(part) {
      Parts.delete(part._id)
        .success(function(data) {
            $scope.newPart = {};
            $scope.customers = data;
        });
    };
}]);
