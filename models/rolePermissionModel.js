'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var RolePermissionSchema = new Schema({
    role_id: {
        type: String,
        required: true,
    }, 
    permission_id: {
        type: String,
        required: true,
    },
  
});

RolePermissionSchema.plugin(uniqueValidator);
RolePermissionSchema.set('timestamps', true);
module.exports = mongoose.model('RolePermissions', RolePermissionSchema);
