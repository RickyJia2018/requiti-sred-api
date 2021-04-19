const { GraphQLList, GraphQLID } = require('graphql');
const { GrantOptionType } = require('../types');
const GrantOptions = require('../../services/grantOption');
const Grants = require('../../services/grants');


const grantOption = {
    type: GrantOptionType,
    args: {
        id: {type: GraphQLID },
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await GrantOptions.findById(args.id);
        
    }
}

module.exports = { grantOption }