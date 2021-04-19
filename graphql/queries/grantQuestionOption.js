const { GraphQLList, GraphQLID } = require('graphql');
const { GrantOptionType } = require('../types');
const GrantOptions = require('../../services/grantOption');
const Grants = require('../../services/grants');


const grantOption = {
    type: GrantOptionType,
    args: {
        id: {type: GraphQLID },
    },
    async resolve(parent,args){
        let result = await GrantOptions.findById(args.id);
        // let grants = await Grants.findByIds(result.grants);
        // result.grants = grants
        return result;
    }
}

module.exports = { grantOption }