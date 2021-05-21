

'use strict';

const mongoose = require('mongoose');
const Employee = mongoose.model('Employees');

exports.create = async (data) => {
    let newEmployee = new Employee(data);
    return await newEmployee.save();
}

exports.findById = async (id) => {
    return await Employee.findById(id);
}

exports.find = async (query, option) => {
    return await Employee.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Employee.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Employee.find(query, option);
}

exports.findAll = async()=> {
    return await Employee.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Employee.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Employee.remove({_id: id});
}