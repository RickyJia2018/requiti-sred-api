const { GraphQLList, GraphQLID } = require('graphql');
const { GrantQuestionType } = require('../types');
const GrantQuestions = require('../../services/grantQuestions');

const grantQuestions = {
    type: new GraphQLList(GrantQuestionType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await GrantQuestions.findAll();
    }
}
const grantQuestion = {
    type: GrantQuestionType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await GrantQuestions.findById(args.id);
    }
}

module.exports = { grantQuestions, grantQuestion }