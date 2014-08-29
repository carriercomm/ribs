angular.module('ribs.service.material', []).factory('Materials', ['$http', function($http) {
    return {
        get: function(systemID) {
            return $http.get('/api/materials/' + systemID);
        },
    };
}]);
