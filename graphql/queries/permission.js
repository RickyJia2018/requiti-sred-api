const { GraphQLList, GraphQLID } = require('graphql');
const { PermissionType } = require('../types');
const PermissionService = require('../../services/permissions');

const allPermissions = {
    type: new GraphQLList(PermissionType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await PermissionService.findAll();
    }
}

const permissions = {
    type: new GraphQLList(PermissionType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await PermissionService.findByCondition({userId: verifiedUser._id});
    }
}

const permission = {
    type: PermissionType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await PermissionService.findById(args.id);
    }
}

module.exports = { permissions, permission,allPermissions }