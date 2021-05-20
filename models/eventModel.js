
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    description:{
        type: String,
    },
    hours:{
        type: Number,
        required: true
    },
    user_id:{
        type: String,
        required: true,
    },
    company_id:{
        type: String,
        required: true,
    },
    allDay: {
        type: String
    },
    start:{
        type: String,
        required: true
    },
    end:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: false
    },
});

EventSchema.plugin(uniqueValidator);
EventSchema.set('timestamps', true);
module.exports = mongoose.model('Events', EventSchema);

