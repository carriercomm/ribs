'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SystemSchema = new Schema({
	SerialNumber_System: { type: String },
	SystemCode: { type: String },
	DeliveryDate: { type: Date },
});

module.exports = mongoose.model('System', SystemSchema, 'System');
