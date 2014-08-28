angular.module('ribs.controller.customer-detail', []).controller('CustomerDetailController', ['$scope', '$routeParams', 'Customers', function($scope, $routeParams, Customers) {
    $scope.tagline = "$routeParams.customerID";
}]);
