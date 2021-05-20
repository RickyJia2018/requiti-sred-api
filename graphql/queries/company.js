const { GraphQLList, GraphQLID } = require('graphql');
const { CompanyType } = require('../types');
const CompanyService = require('../../services/company');

const companies = {
    type: new GraphQLList(CompanyType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await CompanyService.findAll();
    }
}
const company = {
    type: CompanyType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        // if(!verifiedUser) throw new Error("Unauthorized")
        return await CompanyService.findById(args.id);
    }
}

module.exports = { companies, company }