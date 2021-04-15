const { UserType } = require("../types");
const  User = require("../../models/userModel");
const { generateToken } = require("../../util/tokenUtil");
const { GraphQLString } = require("graphql");
const { encrypt, compareEncryption } = require('../../util/encrypUtil');
const register = {
    type: UserType,
    description: "Register user",
    args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        company: {type: GraphQLString},
        phone: {type: GraphQLString},
    },
    async resolve(parent, args){
        console.log(args);
        const { name, email, password, company, phone } = args;
        const encryptedPassword =await encrypt(password);
        const userData = {name, email, company, phone}
        userData.password = encryptedPassword;
        userData.status = 'active';
        userData.role = 'trial';
        const user = new User(userData);
        return await user.save();
        
    }
}


const login = {
    type: GraphQLString,
    description: "Login user",
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select("+password")
        const validation =user? await compareEncryption(args.password,user.password):false;
        if (!user || !validation) {
            throw new Error("Invalid credentials")
        }
    
        const token = generateToken(user)
        return token
    },
  }

module.exports = { register, login }