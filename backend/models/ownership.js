'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OwnershipSchema = new Schema({
	HospitalName: { type: String },
	SerialNumber_System: { type: Number },
});

module.exports = mongoose.model('Ownership', OwnershipSchema, 'Ownership');
