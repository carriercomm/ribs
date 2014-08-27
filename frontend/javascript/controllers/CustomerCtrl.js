angular.module('CustomerCtrl', []).controller('CustomerController', ['$scope', '$http', 'Customers', function($scope, $http, Customers) {
    $scope.formData = {};

    Customers.get()
      .success(function(data) {
        $scope.customers = data;
      });

    $scope.createCustomer = function() {
      Customers.create($scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.customers = data;
        });
    };
}]);
