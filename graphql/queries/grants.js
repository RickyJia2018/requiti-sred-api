const { GraphQLList, GraphQLID } = require('graphql');
const { GrantType } = require('../types');
const Grants = require('../../services/grants');

const grants = {
    type: new GraphQLList(GrantType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await Grants.findAll();
    }
}
const grant = {
    type: GrantType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await Grants.findById(args.id);
    }
}

module.exports = { grants, grant }