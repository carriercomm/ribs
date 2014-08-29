angular.module('ribs.routes', ['templates-main']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.tmpl.html',
            controller: 'MainController'
        })
        .when('/customers', {
            templateUrl: 'views/customers.tmpl.html',
            controller: 'CustomerController'
        })
        .when('/customers/:customerID', {
            templateUrl: 'views/customer-detail.tmpl.html',
            controller: 'CustomerDetailController'
        })
        .when('/parts', {
            templateUrl: 'views/parts.tmpl.html',
            controller: 'PartController'
        })
        .when('/materials/:materialID', {
            templateUrl: 'views/materials.tmpl.html',
            controller: 'MaterialController'
        })
        .otherwise({
            templateUrl: 'views/home.tmpl.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);
}]);
