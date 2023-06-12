'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        index:true
    },
    education:{
        type: String
    }, 
    position:{
        type: String
    },
    nature:{
        type: String
    },
    experience:{
        type: String
    },
    sred_hours:{
        type: Number,
        default: 0
    },
    total_hours:{
        type: Number,
        default: 0
    },
    sred_salary:{
        type: Number,
        default: 0
    },
    total_salary:{
        type: Number,        
        default: 0
    },
    year:{
        type: Number,
        default: 2020
    },
    company_id:{
        type: String,
        required: true
    }, 
    user_id:{
        type: String,
        required: false
    },
    remark: {
        type: String
    },
    status: {
        type: String,
        enum : ['inactive', 'active', 'blocked'],
        default: 'active'
    }
});

EmployeeSchema.plugin(uniqueValidator);
EmployeeSchema.set('timestamps', true);
module.exports = mongoose.model('Employees', EmployeeSchema);
