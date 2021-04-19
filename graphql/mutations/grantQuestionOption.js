const { GrantOptionType } = require("../types");
const GrantOption = require('../../services/grantOption')
const { GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = require("graphql");

const addGrantOption = {
    type: GrantOptionType,
    description: "Create new option.",
    args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
       questionId: {type: GraphQLID},
       grants: {type: new GraphQLList(GraphQLID)}

    },
    async resolve(parent, args,{verifiedUser}){     
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await GrantOption.create(newData);
    }
}

const updateGrantOption = {
    type: GrantOptionType,
    description: "Update option question",
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        questionId: {type: GraphQLID},
        grants: {type: new GraphQLList(GraphQLID)}


    },
    async resolve(parent, args,{verifiedUser}){     
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await GrantOption.update(args.id, newData);
    }
}
const deleteGrantOption = {
    type: GraphQLBoolean,
    description: "Delete option of question",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        let result = await GrantOption.delete(args.id);
        return result.n
    }
}

module.exports = { addGrantOption, updateGrantOption, deleteGrantOption }