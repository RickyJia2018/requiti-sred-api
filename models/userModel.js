'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
var UserSchema = new Schema({
    _id: {type: String, required: true},
    nick_name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum : ['trial','normal','admin'],
        required: false
    },
   
    acc_id: {
        type: String,
        required: false,
        unique: true,
        index: true
    },
    
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
   
    logo: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum : ['inactive', 'active', 'blocked'],
        default: 'active'
    }

});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(uniqueValidator);
UserSchema.set('timestamps', true);
module.exports = mongoose.model('Users', UserSchema);
