const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { RoleEnumType } = require('../helpers/enums')
const Models = require('../models')
const GrantService = require('../services/grants');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        company: { type: GraphQLString },
        role: { type: RoleEnumType },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        avatar: { type: GraphQLString },
        status: { type: GraphQLString },
        
        
    })
})

const GrantType = new GraphQLObjectType({
    name: "Grant",
    description: "Grant type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        funds_amount: { type: GraphQLString },
        description: { type: GraphQLString },
    })
})
const GrantQuestionType = new GraphQLObjectType({
    name: "GrantQuestion",
    description: "Questions type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        options: {
            type: new GraphQLList(GrantOptionType),
            resolve(parent, args){
                return Models.GrantOption.find({questionId: parent.id})
            }
        }
    })
})


const GrantOptionType = new GraphQLObjectType({
    name: "GrantOption",
    description: "Options type.",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        grants: {
            type: new GraphQLList(GrantType),
            async resolve(parent, args){                 
               return await GrantService.findByIds(parent.grants);
            }
        }
    })
})

module.exports = { 
    UserType,GrantType,
     GrantQuestionType, GrantOptionType 
    };