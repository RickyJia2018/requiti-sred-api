const { GrantType } = require("../types");
// const  User = require("../../models/userModel");
const Grants = require('../../services/grants')
const { GraphQLString, GraphQLID } = require("graphql");
const { RoleEnumType } = require('../../helpers/enums');

const addGrants = {
    type: GrantType,
    description: "Create new grants.",
    args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        funds_amount: {type: GraphQLString},
       
    },
    async resolve(parent, args){     
        let newData = {...args}
        return await Grants.create(newData);

    }
}

const updateGrants = {
    type: GrantType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        funds_amount: {type: GraphQLString},
       
    },
    async resolve(parent, args){     
        let newData = {...args}
        return await Grants.update(args.id, newData);
    }
}
const deleteGrants = {
    type: GrantType,
    description: "Delete grant",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args){
        return await Grants.delete(args.id);
    }
}

module.exports = { addGrants, updateGrants, deleteGrants }