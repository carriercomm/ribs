angular.module('ribs.controller.customer-detail', []).controller('CustomerDetailController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    Customers.getCustomerDetail($routeParams.customerID)
      .success(function(data) {
        $scope.customer = data;
        
        if ($scope.customer.Location[0] === 0 && $scope.customer.Location[1] === 0)
        {
            // now do a query
        }
        
      });
}]);
