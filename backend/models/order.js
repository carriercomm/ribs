'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    fruNumber: { type: String, required: true },
    SerialNumber_System: {type: String, required: true},
    OrderDate: {type: Date},
    DeliverDate: {type: Date}
});

module.exports = mongoose.model('Order', OrderSchema);