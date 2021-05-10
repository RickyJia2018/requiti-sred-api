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
        company: {type: GraphQLString},
        phone: {type: GraphQLString},
        status: {type: GraphQLString},
        role: {type: GraphQLString},
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
        console.log('new user data:\n',newUserData);
        // delete newUser.id
        let newUser = await Users.update(args.id, newUserData);

        
        console.log('new user is:\n\n\n',newUser);

    }
}


module.exports = { updateUser }