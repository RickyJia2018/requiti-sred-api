const { PermissionType } = require("../types");
// const  User = require("../../models/userModel");
const Permission = require('../../services/permissions')
const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");

const addPermission = {
    type: PermissionType,
    description: "Create new permission.",
    args: {
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        url: { type: GraphQLString },
        resource: { type: GraphQLString },
        action: { type: GraphQLString },
        remark: { type: GraphQLString },
        status: { type: GraphQLString },

    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await Permission.create(newData);
    }
}

const updatePermission = {
    type: PermissionType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        url: { type: GraphQLString },
        resource: { type: GraphQLString },
        action: { type: GraphQLString },
        remark: { type: GraphQLString },
        status: { type: GraphQLString },
    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await Permission.update(args.id, newData);
    }
}
const deletePermission = {
    type: GraphQLBoolean,
    description: "Delete permission",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await Permission.delete(args.id);
        return result.n
    }
}

module.exports = { addPermission, updatePermission, deletePermission }