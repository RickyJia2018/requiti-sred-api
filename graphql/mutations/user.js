const { UserType } = require("../types");
// const  User = require("../../models/userModel");
const Users = require('../../services/users')
const { GraphQLString, GraphQLID } = require("graphql");
const { RoleEnumType } = require('../../helpers/enums');
const { encrypt, compareEncryption } = require('../../util/encrypUtil');


const updateUser = {
    type: UserType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        company_id: {type: GraphQLString},
        phone: {type: GraphQLString},
        status: {type: GraphQLString},
        role_id: {type: GraphQLString},
        avatar: {type: GraphQLString},
        alter_contact:{ type: GraphQLString },

    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        // console.log(verifiedUser);

        let newUserData = {...args}
        if(newUserData.password){
            const encryptedPassword =await encrypt(newUserData.password);
            newUserData.password = encryptedPassword;

        }
        // delete newUser.id
        return await Users.update(args.id, newUserData);

        

    }
}


module.exports = { updateUser }