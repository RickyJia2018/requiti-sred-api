'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
var SREDSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grantId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum : ['prepare','filed','auditing'],
        default: "prepare"
    },
    description: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: false,
     
    },
    contract: {
        type: String,
        required: false
    },
    timesheet: {
        type: String,
        required: false
    },
    T2: {
        type: String,
        required: false
    },
    T4: {
        type: String,
        required: false
    },
    projectIntro: {
        type: String,
        required: false
    },
    supportingDoc1: {
        type: String,
        required: false
    },
    supportingDoc2: {
        type: String,
        required: false
    },
    supportingDoc3: {
        type: String,
        required: false
    },
});

SREDSchema.plugin(mongoosePaginate);
SREDSchema.plugin(uniqueValidator);
SREDSchema.set('timestamps', true);
module.exports = mongoose.model('SRED', SREDSchema);
