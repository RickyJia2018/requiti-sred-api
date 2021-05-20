const { GraphQLList, GraphQLID } = require('graphql');
const { UserType } = require('../types');
const User = require('../../services/users');

const users = {
    type: new GraphQLList(UserType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await User.findAll();
    }
}
const user = {
    type: UserType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await User.findById(args.id);
    }
}

const usersByCompany = {
    type: new GraphQLList(UserType),
    args: {company_id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await User.findByCondition({company_id: args.company_id})
    }
}

module.exports = { users, user, usersByCompany }