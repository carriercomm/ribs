'use strict';

var Customer = require('./models/customer');
var System = require('./models/system');
var Ownership = require('./models/ownership');
var MaterialPlacement = require('./models/materialplacement');

var Materials = require('./models/materialtype');
var Material = require('./models/material');
var UniqueDevice = require('./models/uniquedevice');

module.exports = function(application) {
    application.get('/api/customers', function(request, result) {
        Customer.find(function(error, customers) {
            if (error) result.send(error);
            result.json(customers);
        });
    });

    application.get('/api/customers/:customer_id', function(request, result) {
        Customer.findOne({ _id : request.params.customer_id }, function(error, customer) {
            if (error) { result.send(error); }
            var output = {};
            Ownership.find({ HospitalName : customer.HospitalName }, function(error, ownership) {
                var serialNumbers = [];
                for (var i in ownership) {
                    serialNumbers.push(ownership[i].SerialNumber_System);
                }

                System.where('SerialNumber_System').in(serialNumbers).exec(function(error, system) {
                    var foundResult = { customer: customer, systems: system };
                    result.json(foundResult);
                });
            });
        });
    });

    application.post('/api/customers', function(request, result) {
        Customer.create({
            name : request.body.text,
        }, function(error, customer) {
            if (error) {
                result.send(error);
            } else {
                Customer.find(function(error, customers) {
                    if (error) result.send(error);
                    result.json(customers);
                });
            }
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

    application.get('/api/materials/:system_serial', function(request, result) {
        MaterialPlacement.where({
            SerialNumber_System: request.params.system_serial
        }).exec(function(error, material) {
            if (error) {
                result.send(error);
            } else {
                result.json(material);
            }
        });
    });

    application.get('/api/parts', function(request, result) {
        Materials.find(function(error, parts) {
            if (error) {
                result.send(error);
            } else {
                result.json(parts);
            }
        });
    });

    application.post('/api/parts', function(request, result) {
        var part = request.body.part;

        Materials.create({
            materialNumber : part.twelveNc,
            materialName: part.name,
            materialDescription: part.description
        }, function(error, part) {
            if (error) {
                result.json({ error: error });
            } else {
                Materials.find(function(error, parts) {
                    if (error) result.send(error);
                    result.json(parts);
                });
            }
        });
    });

    application.get('/api/uniquedevice', function(request, result) {
        UniqueDevice.find(function(error, uniquedevice) {
            if (error) result.send(error);
            result.json(uniquedevice);
        });
    });    
}
