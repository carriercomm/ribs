'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MaterialPlacementSchema = new Schema({
    SerialNumber_System: { type: String },
    MaterialNumber: { type: String },
    SerialNumber_Material: { type: String },
    PlacedDate: { type: Date },
    RemovedDate: { type: Date }
});

module.exports = mongoose.model('MaterialPlacement', MaterialPlacementSchema, 'MaterialPlacement');
