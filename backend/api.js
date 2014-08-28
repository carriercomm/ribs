'use strict';

var Customer = require('./models/customer');
var UniqueDevice = require('./models/uniquedevice');

module.exports = function(application) {
    application.get('/api/customers', function(request, result) {
        Customer.find(function(error, customers) {
            if (error) result.send(error);
            result.json(customers);
        });
    });

    application.post('/api/customers', function(request, result) {
        Customer.create({
            name : request.body.text
        }, function(error, customer) {
            if (error)
                result.send(error);

            Customer.find(function(error, customers) {
                if (error) result.send(error);
                result.json(customers);
            });
        });
    });

    application.delete('/api/customers/:customer_id', function(request, result) {
        Customer.remove({
            _id : request.params.customer_id
        }, function(error, customer) {
            if (error)
                result.send(error);

            Customer.find(function(error, customers) {
                if (error) result.send(error);
                result.json(customers);
            });
        });
    });

    application.get('/api/uniquedevice', function(request, result) {
        UniqueDevice.find(function(error, uniquedevice) {
            if (error) result.send(error);
            result.json(uniquedevice);
        });
    });    
}
