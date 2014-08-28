angular.module('ribs.service.part', []).factory('Parts', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/parts');
        },

        create: function(partData) {
            return $http.post('/api/parts', { part: partData });
        },

        delete: function(partID) {
            return $http.delete('/api/parts/' + partID);
        }
    };
}]);
