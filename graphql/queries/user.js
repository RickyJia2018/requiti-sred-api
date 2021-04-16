const { GraphQLList, GraphQLID } = require('graphql');
const { UserType } = require('../types');
const User = require('../../services/users');

const users = {
    type: new GraphQLList(UserType),
    async resolve(parent,args){
        return await User.findAll();
    }
}
const user = {
    type: UserType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args){
        return await User.findById(args.id);
    }
}

module.exports = { users, user }