angular.module('ribs.controller.customer', []).controller('CustomerController', ['$scope', 'Customers', function($scope, Customers) {
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
    
    $scope.deleteCustomer = function(customer) {
      Customers.delete(customer._id)
        .success(function(data) {
            $scope.formData = {};
            $scope.customers = data;
        });
    };
}]);
