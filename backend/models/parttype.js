'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartTypeSchema = new Schema({
    ID: String, //12NC
    Name: String,
    Description: String

});

module.exports = mongoose.model('PartType', PartTypeSchema);
