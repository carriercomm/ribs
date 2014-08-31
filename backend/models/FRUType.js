'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FRUTypeSchema = new Schema({
    FRUNumber: { type: String},
    MaterialNumber: { type: String},
});

module.exports = mongoose.model('FRUType', FRUTypeSchema, 'FRUType');
