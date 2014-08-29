angular.module('ribs.controller.main', ['google-maps']).controller('MainController', ['$scope', function($scope) {
    $scope.tagline = 'For all your service and replacement requirements!';
    
    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8
    };
    
}]);
