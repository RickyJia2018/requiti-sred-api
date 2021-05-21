const { GraphQLList, GraphQLID } = require('graphql');
const { SREDType } = require('../types');
const SREDService = require('../../services/sred');

const allSREDProjects = {
    type: new GraphQLList(SREDType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await SREDService.findAll();
    }
}
const SREDProjects = {
    type: new GraphQLList(SREDType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await SREDService.findByCondition({userId: verifiedUser._id});
    }
}
const SREDProject = {
    type: SREDType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await SREDService.findById(args.id);
    }
}
const SREDProjectsByCompany = {
    type: new GraphQLList(SREDType),
    args: {company_id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await SREDService.findByCondition({company_id: args.company_id});
    }
}

module.exports = { allSREDProjects, SREDProjects, SREDProject, SREDProjectsByCompany }