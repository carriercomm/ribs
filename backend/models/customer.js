'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: String,
    location: [],
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UniqueDevice' }],
    country: String
});

module.exports = mongoose.model('Customer', CustomerSchema);
