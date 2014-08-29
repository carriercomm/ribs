'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Material = require('./material')

var SystemSchema = new Schema({
	SerialNumber: { type: Number },
	SystemCode: { type: String },
	DeliveryDate: { type: Date },
	Materials: [{ type: Material }]
});

module.exports = mongoose.model('System', SystemSchema);
