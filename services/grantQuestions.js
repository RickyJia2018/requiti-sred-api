

'use strict';

const mongoose = require('mongoose');
const Questions = mongoose.model('GrantQuestions');

exports.create = async (data) => {
    const Question = mongoose.model('GrantQuestions');
    let newQuestion = new Question(data);
    return await newQuestion.save();
}

exports.findById = async (id) => {
    return await Questions.findById(id);
}

exports.find = async (query, option) => {
    return await Questions.find(query, option);
}
exports.findByIds = async (ids)=> {
    return await Questions.find({_id: {$in: ids}});
}

exports.findByCondition = async(query, option)=> {
    return await Questions.paginate(query, option);
}

exports.findAll = async()=> {
    return await Questions.find();//paginate({},{offset: 20, limit: 10});
}

exports.update = async (id, body)=> {
    let document = {
        $set: body
    }
    return await Questions.findOneAndUpdate({_id: id}, document, { new: true });
}

exports.delete = async (id)=>{
    return await Questions.remove({_id: id});
}