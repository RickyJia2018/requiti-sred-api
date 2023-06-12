'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        index:true,
        unique: true,
    },
    description: {
        type: String
    },
    phone:{
        type: String
    },
    country:{
        type: String
    },
    province:{
        type: String
    },
    city:{
        type: String
    },
    address:{
        type: String
    },
    postCode:{
        type: String
    },
    manager:{
        type: String
    },
    permissions:{
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum : ['inactive', 'active', 'blocked'],
        default: 'active'
    }
});

CompanySchema.plugin(uniqueValidator);
CompanySchema.set('timestamps', true);
module.exports = mongoose.model('Companies', CompanySchema);


