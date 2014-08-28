'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartTypeSchema = new Schema({
    twelveNc: { type: String,
                required: true,
                uppercase: true,
                match: [ /^12NC/, 'The 12NC identifier should start with "12NC".' ] },
    name: { type: String,
    	    required: true },
    description: String,
    imageUrl: String
});

module.exports = mongoose.model('PartType', PartTypeSchema);
