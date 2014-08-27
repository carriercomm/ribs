angular.module('CustomerService', []).factory('Customers', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/customers');
        },

        create: function(customerData) {
            return $http.post('/api/customers', customerData);
        },

        delete: function(customerID) {
            return $http.delete('/api/customers' + customerID);
        }
    };
}]);
