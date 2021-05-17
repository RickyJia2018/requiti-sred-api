

'use strict';

const mongoose = require('mongoose');
const Role = mongoose.model('Roles');

exports.create = async (data) => {
    // const Role = mongoose.model('Role');
    let newRole = new Role(data);
    return await newRole.save();
}

exports.findById = async (id) => {
    return await Role.findById(id);
}

exports.find = async (query, option) => {
    return await Role.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Role.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Role.find(query, option);
}

exports.findAll = async()=> {
    return await Role.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Role.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Role.remove({_id: id});
}