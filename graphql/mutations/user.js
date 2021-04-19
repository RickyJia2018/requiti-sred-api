const { UserType } = require("../types");
// const  User = require("../../models/userModel");
const Users = require('../../services/users')
const { GraphQLString, GraphQLID } = require("graphql");
const { RoleEnumType } = require('../../helpers/enums');


const updateUser = {
    type: UserType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        company: {type: GraphQLString},
        phone: {type: GraphQLString},
        status: {type: GraphQLString},
        role: {type: GraphQLString},
        avatar: {type: GraphQLString},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let newUser = {...args}
        // delete newUser.id
        return await Users.update(args.id, newUser);

    }
}


module.exports = { updateUser }