const { UserType } = require("./types");
const  User = require("../models/userModel");
const { generateToken } = require("../util/tokenUtil");
const { GraphQLString } = require("graphql");

const register = {
    type: UserType,
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
        const userData = {name, email, password, company, phone}
        userData.status = 'active';
        userData.role = 'trial';
        // userData.token = generateToken(userData);
        const user = new User(userData);
        
        return await user.save();
        
    }
}

module.exports = { register }