

'use strict';

const mongoose = require('mongoose');
const Event = mongoose.model('Events');

exports.create = async (data) => {
    let newEvent = new Event(data);
    return await newEvent.save();
}

exports.findById = async (id) => {
    return await Event.findById(id);
}

exports.find = async (query, option) => {
    return await Event.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Event.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Event.find(query, option);
}

exports.findAll = async()=> {
    return await Event.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Event.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Event.remove({_id: id});
}