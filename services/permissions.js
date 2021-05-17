'use strict';

const mongoose = require('mongoose');
const Permissions = mongoose.model('Permissions');

exports.create = async (data) => {
    // const Permissions = mongoose.model('Permissions');
    let newPermissions = new Permissions(data);
    return await newPermissions.save();
}

exports.findById = async (id) => {
    return await Permissions.findById(id);
}

exports.find = async (query, option) => {
    return await Permissions.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Permissions.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Permissions.find(query, option);
}

exports.findAll = async()=> {
    return await Permissions.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Permissions.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Permissions.remove({_id: id});
}