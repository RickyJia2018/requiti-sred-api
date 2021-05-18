const { GraphQLList, GraphQLID } = require('graphql');
const { RolePermissionType } = require('../types');
const RolePermissionService = require('../../services/rolePermissions');

const allRolePermissions = {
    type: new GraphQLList(RolePermissionType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await RolePermissionService.findAll();
    }
}
const rolePermissions = {
    type: new GraphQLList(RolePermissionType),
    args: {
        role_id: {type: GraphQLID}
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await RolePermissionService.findByCondition({role_id: args.role_id});
    }
}


module.exports = { allRolePermissions, rolePermissions }