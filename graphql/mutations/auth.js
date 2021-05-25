const { UserType } = require("../types");
const  User = require("../../models/userModel");
const Users = require('../../services/users')
const { generateToken } = require("../../util/tokenUtil");
const { GraphQLString, GraphQLID} = require("graphql");
const { encrypt, compareEncryption } = require('../../util/encrypUtil');
const { user } = require("../queries");
const { Company, Role } = require("../../models");
const config = require('../../config');
const jwtExpirySeconds = config.jwt_expiry_seconds;

const register = {
    type: UserType,
    description: "Register user",
    args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        company_id: {type: GraphQLID},
        role_id: {type: GraphQLID},
        phone: {type: GraphQLString},
        alter_contact:{ type: GraphQLString },
    },
    async resolve(parent, args){
        const { name, email, password, company, phone } = args;
        const encryptedPassword =await encrypt(password);
        const userData = {name, email, company, phone}
        userData.password = encryptedPassword;
        userData.status = 'active';
        // userData.role = 'trial';
        return await Users.create(userData);

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

        let data = user.toJSON();
        const company = await Company.findById(data.company_id);
        data['company'] = company;
        delete data.password;
        const token = generateToken(data,jwtExpirySeconds)
        return token
    },
  }

module.exports = { register, login }