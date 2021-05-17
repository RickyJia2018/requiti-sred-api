const { GraphQLList, GraphQLID } = require('graphql');
const { RoleType } = require('../types');
const RoleService = require('../../services/roles');

const allRoles = {
    type: new GraphQLList(RoleType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await RoleService.findAll();
    }
}
const roles = {
    type: new GraphQLList(RoleType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await RoleService.findByCondition({userId: verifiedUser._id});
    }
}
const role = {
    type: RoleType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await RoleService.findById(args.id);
    }
}

module.exports = { allRoles, roles, role }