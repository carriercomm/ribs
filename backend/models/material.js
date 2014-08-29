'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialType = require('./materialtype')

var MaterialSchema = new Schema({
	type: [{ type: MaterialType }],
	materialSerialNumber: { type: String }
});

module.exports = mongoose.model('Material', MaterialSchema);
