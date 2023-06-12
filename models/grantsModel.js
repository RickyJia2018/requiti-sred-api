'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
var GrantsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    funds_amount:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: false,
    },

});

GrantsSchema.plugin(mongoosePaginate);
GrantsSchema.plugin(uniqueValidator);
GrantsSchema.set('timestamps', true);
module.exports = mongoose.model('Grants', GrantsSchema);
