'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    HospitalName: { type: String, required: true },
    CountryName: { type: String },
    City: { type: String },
    Location: { type: [Number], default: [0,0] }, // WGS84 Coordinate [ lon, lat ]
});

module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');
