const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const { User } = require('../models');

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        company: { type: GraphQLString },
        role: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        avatar: { type: GraphQLString },
        status: { type: GraphQLString },
        
        
    })
})

module.exports = { UserType };