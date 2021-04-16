

'use strict';

const mongoose = require('mongoose');
const Users = mongoose.model('Users');

exports.create = async (data) => {
    const User = mongoose.model('Users');
    let newUser = new User(data);
    return await newUser.save();
}

exports.findById = async (id) => {
    return await Users.findById(id);
}

exports.find = async (query, option) => {
    return await Users.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Users.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Users.paginate(query, option);
}

exports.findAll = async()=> {
    return await Users.paginate();
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Users.findOneAndUpdate({_id: id}, document, { new: true });
}