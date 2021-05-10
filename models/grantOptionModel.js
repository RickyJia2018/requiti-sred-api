'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
var GrantOptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
   questionId: {
    type: String,
    required: true
   },
   grants: {
       type: [String],
       required: true
   }

});

GrantOptionSchema.plugin(mongoosePaginate);
GrantOptionSchema.plugin(uniqueValidator);
GrantOptionSchema.set('timestamps', true);
module.exports = mongoose.model('GrantOptions', GrantOptionSchema);
