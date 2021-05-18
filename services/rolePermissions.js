

'use strict';

const mongoose = require('mongoose');
const RolePermission = mongoose.model('RolePermissions');

exports.create = async (data) => {
    // const RolePermission = mongoose.model('RolePermission');
    let newRolePermission = new RolePermission(data);
    return await newRolePermission.save();
}

exports.findById = async (id) => {
    return await RolePermission.findById(id);
}

exports.find = async (query, option) => {
    return await RolePermission.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await RolePermission.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await RolePermission.find(query, option);
}

exports.findAll = async()=> {
    return await RolePermission.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await RolePermission.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await RolePermission.remove({_id: id});
}