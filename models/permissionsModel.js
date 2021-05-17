'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var PermissionSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: false
    },
    resource: {
        type: String,
        required: false
    },
    methods: [{
        type: String,
        enum : ["POST", "GET", "PUT", "DELETE"],
        default: 'GET'
    }],
    action: {
        type: String,
        enum : ['allow', 'deny'],
        default: 'allow'
    },
    remark: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum : ['inactive', 'active', 'blocked'],
        default: 'active'
    }

});

PermissionSchema.plugin(uniqueValidator);
PermissionSchema.set('timestamps', true);
module.exports = mongoose.model('Permissions', PermissionSchema);
