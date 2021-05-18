const { RoleType } = require("../types");
// const  User = require("../../models/userModel");
const RolePermission = require('../../services/rolePermissions')
const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");

const addRolePermission = {
    type: RoleType,
    description: "Create new role.",
    args: {
        role_id:{type: GraphQLID},
        permission_id:{type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await RolePermission.create(newData);
    }
}

const deleteRolePermission = {
    type: GraphQLBoolean,
    description: "Delete role permission",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await RolePermission.delete(args.id);
        return result.n
    }
}

module.exports = { addRolePermission, deleteRolePermission }