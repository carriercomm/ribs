angular.module('ribs.service.customer', []).factory('Customers', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/customers');
        },

        getCustomerDetail: function(customerID) {
            return $http.get('/api/customers/' + customerID);
        },

        create: function(customerData) {
            return $http.post('/api/customers', customerData);
        },

        update: function(customerData) {
            return $http.post('/api/customers/' + customerData._id , customerData);
        },        
        
        delete: function(customerID) {
            return $http.delete('/api/customers/' + customerID);
        }
    };
}]);
