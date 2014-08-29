'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    HospitalName: { type: String, required: true },
    CountryName: { type: String },
    City: { type: String },
    Location: [Number], // WGS84 Coordinate [ lon, lat ]
});

module.exports = mongoose.model('Customer', CustomerSchema, 'Customer');
