

'use strict';

const mongoose = require('mongoose');
const Company = mongoose.model('Companies');

exports.create = async (data) => {
    // const Company = mongoose.model('Company');
    let newCompany = new Company(data);
    return await newCompany.save();
}

exports.findById = async (id) => {
    return await Company.findById(id);
}

exports.find = async (query, option) => {
    return await Company.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Company.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Company.find(query, option);
}

exports.findAll = async()=> {
    return await Company.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Company.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Company.remove({_id: id});
}