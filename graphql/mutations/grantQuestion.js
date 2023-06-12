const { GrantQuestionType } = require("../types");
const GrantQuestion = require('../../services/grantQuestions')
const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");

const addGrantQuestion = {
    type: GrantQuestionType,
    description: "Create new question.",
    args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        first_question: {
            type: GraphQLBoolean
        },
    },
    async resolve(parent, args,{verifiedUser}){     
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await GrantQuestion.create(newData);
    }
}

const updateGrantQuestion = {
    type: GrantQuestionType,
    description: "Update question",
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        first_question: {
            type: GraphQLBoolean
        },
        description: { type: GraphQLString },
    },
    async resolve(parent, args,{verifiedUser}){     
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await GrantQuestion.update(args.id, newData);
    }
}
const deleteGrantQuestion = {
    type: GraphQLBoolean,
    description: "Delete question",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        let result = await GrantQuestion.delete(args.id);
        return result.n
    }
}

module.exports = { addGrantQuestion, updateGrantQuestion, deleteGrantQuestion }