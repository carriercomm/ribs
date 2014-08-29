'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialTypeSchema = new Schema({
    materialNumber: { type: String,
                      required: true,
                      uppercase: true,
                      match: [ /^12NC/, 'The 12NC identifier should start with "12NC".' ] },
    materialName: { type: String,
    	            required: true },
    materialDescription: String,
    imageUrl: String
});

module.exports = mongoose.model('MaterialType', MaterialTypeSchema);
