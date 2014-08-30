'use strict';

var Customer = require('./models/customer');
var System = require('./models/system');
var Ownership = require('./models/ownership');
var MaterialPlacement = require('./models/materialplacement');

var Materials = require('./models/materialtype');
var Material = require('./models/material');
var UniqueDevice = require('./models/uniquedevice');
var FRUs = require('./models/frutype');
var Order = require('./actions/order');

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

    application.post('/api/customers/:customer_id', function(request, result) {
        Customer.findByIdAndUpdate( request.params.customer_id, request.body, function(error, customer) {
            if (error) { 
				console.log(error);
				result.send(error); 
			}
            else {
                console.log(customer);
                result.json(customer);
            }
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

    application.get('/api/actions/order_fru', function(request, result) {

    		var materialNumber = request.query.MaterialNumber;
    		    	
				FRUs.findOne({"MaterialNumber": materialNumber}, 'FRUNumber', function(error, frunumber) {
					if (error) { result.send(error); }
          
					var orderDate = new Date()
					var serialNumber_System = request.query.SerialNumber_System;
          
					Order.create({
					    fruNumber: frunumber,
					    SerialNumber_System: serialNumber_System,
					    OrderDate: orderDate,
					    DeliverDate: null
	        }, function(error, part) {
	            if (error) {
	                result.json({ error: error });
	            } else {
	                Order.find(function(error, order) {
	                    if (error) result.send(error);
	                    result.json(order);
	                });
	            }
	        });
			  });
        
    });    

	  application.get('/api/actions/place_material', function(request, result) {

				var placeDate = new Date()

				MaterialPlacement.findOne({ $and:[ {"MaterialNumber": request.query.MaterialNumber}, {"SerialNumber_System": request.query.SerialNumber_System}]}, '_id', function(error, id) {
					if (error) { result.send(error); }
					if(!id) {				
						MaterialPlacement.create({
						    MaterialNumber: materialNumber,
						    SerialNumber_System: serialNumber_System,
						    SerialNumber_Material: serialNumber_Material,
						    PlacedDate: placeDate 
		        }, function(error, newmaterialplacement) {
		            if (error) {
		                result.json({ error: error });
		            } else {
		                MaterialPlacement.find(function(error, newmaterialplacement) {
		                    if (error) result.send(newmaterialplacement);
		                    result.json(newmaterialplacement);
		                });
		            }
		        });
		      }
		      else
	      	{
					MaterialPlacement.update ({_id: id}, {$set: {PlacedDate: placeDate }}, function (err, materialplacement) {
					  if (err) return handleError(err);
					  result.json(materialplacement);
					});
					}
			  });
        
    });    
	  application.get('/api/actions/remove_material', function(request, result) {

				var removedDate = new Date()

				MaterialPlacement.findOne({ $and:[ {"MaterialNumber": request.query.MaterialNumber}, {"SerialNumber_System": request.query.SerialNumber_System}]}, '_id', function(error, id) {
					if (error) { result.send(error); }
	
					if(id) {				
						MaterialPlacement.update ({_id: id}, {$set: {RemovedDate: removedDate}}, function (err, materialplacement) {
						  if (err) return handleError(err);
						  result.json(materialplacement);
						});
					}
			  });
        
    });    
}
