

'use strict';

const mongoose = require('mongoose');
const Grants = mongoose.model('Grants');

exports.create = async (data) => {
    const Grants = mongoose.model('Grants');
    let newGrants = new Grants(data);
    return await newGrants.save();
}

exports.findById = async (id) => {
    return await Grants.findById(id);
}

exports.find = async (query, option) => {
    return await Grants.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Grants.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Grants.paginate(query, option);
}

exports.findAll = async()=> {
    return await Grants.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Grants.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Grants.remove({_id: id});
}