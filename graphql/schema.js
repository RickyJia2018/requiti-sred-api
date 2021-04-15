const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { users, user } = require('./queries');
const { register, login } = require('./mutations');


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Queries",
    fields: { users, user }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Mutations",
    fields:{ register, login }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})