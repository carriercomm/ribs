angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/customers', {
            templateUrl: 'views/customers.html',
            controller: 'CustomerController'
        });

    $locationProvider.html5Mode(true);
}]);
