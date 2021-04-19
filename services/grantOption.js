
'use strict';

const mongoose = require('mongoose');
const Options = mongoose.model('GrantOptions');

exports.create = async (data) => {
    const Option = mongoose.model('GrantOptions');
    let newOption = new Option(data);
    return await newOption.save();
}

exports.findById = async (id) => {
    return await Options.findById(id);
}

exports.find = async (query, option) => {
    return await Options.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Options.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Options.paginate(query, option);
}

exports.findAll = async()=> {
    return await Options.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Options.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Options.remove({_id: id});
}