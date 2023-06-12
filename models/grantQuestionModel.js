'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
var GrantQuestionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    first_question: {
       type: Boolean,
       required: true,
    }

});

GrantQuestionSchema.plugin(mongoosePaginate);
GrantQuestionSchema.plugin(uniqueValidator);
GrantQuestionSchema.set('timestamps', true);
module.exports = mongoose.model('GrantQuestions', GrantQuestionSchema);
