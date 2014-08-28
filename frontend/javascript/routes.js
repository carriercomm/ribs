angular.module('ribs.routes', ['templates-main']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.tmpl.html',
            controller: 'MainController'
        })
        .when('/customers', {
            templateUrl: 'views/customers.tmpl.html',
            controller: 'CustomerController'
        });

    $locationProvider.html5Mode(true);
}]);
