angular.module('ribs.controller.customer-detail', []).controller('CustomerDetailController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    Customers.getCustomerDetail($routeParams.customerID)
      .success(function(data) {
        $scope.customer = data;
      });
}]);
