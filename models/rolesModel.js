'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var RoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        index:true
    },
    remark: {
        type: String
    },
    company_id:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ['inactive', 'active', 'blocked'],
        default: 'active'
    }
});

RoleSchema.plugin(uniqueValidator);
RoleSchema.set('timestamps', true);
module.exports = mongoose.model('Roles', RoleSchema);
