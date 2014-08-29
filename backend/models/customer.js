'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var System = require('./system')

var CustomerSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String },
    location: [], // WGS84 Coordinate [ lon, lat ]
    systems: [{ type: System }],
});

module.exports = mongoose.model('Customer', CustomerSchema);
