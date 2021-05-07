

'use strict';

const mongoose = require('mongoose');
const SRED = mongoose.model('SRED');

exports.create = async (data) => {
    // const SRED = mongoose.model('SRED');
    let newSRED = new SRED(data);
    return await newSRED.save();
}

exports.findById = async (id) => {
    return await SRED.findById(id);
}

exports.find = async (query, option) => {
    return await SRED.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await SRED.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await SRED.find(query, option);
}

exports.findAll = async()=> {
    return await SRED.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await SRED.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await SRED.remove({_id: id});
}