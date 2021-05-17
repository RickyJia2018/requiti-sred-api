const { RoleType } = require("../types");
// const  User = require("../../models/userModel");
const Role = require('../../services/roles')
const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");

const addRole = {
    type: RoleType,
    description: "Create new role.",
    args: {
        name: {type: GraphQLString},
        company_id:{type: GraphQLID},
        remark: { type: GraphQLString },
        status: { type: GraphQLString },

    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await Role.create(newData);
    }
}

const updateRole = {
    type: RoleType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        company_id:{type: GraphQLID},
        remark: { type: GraphQLString },
        status: { type: GraphQLString },
    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await Role.update(args.id, newData);
    }
}
const deleteRole = {
    type: GraphQLBoolean,
    description: "Delete permission",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await Role.delete(args.id);
        return result.n
    }
}

module.exports = { addRole, updateRole, deleteRole }