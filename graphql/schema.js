const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { users, user } = require('./queries');
const mut = require('./mutations');
// const { register, login } = require('./mutations');


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Queries",
    fields: { users, user }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Mutations",
    fields: mut
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
})