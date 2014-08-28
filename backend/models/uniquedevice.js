'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UniqueDeviceSchema = new Schema({
    serialnumber: String,
    location: String
});

module.exports = mongoose.model('UniqueDevice', UniqueDeviceSchema);
