const { SREDType } = require("../types");
// const  User = require("../../models/userModel");
const SREDService = require('../../services/sred')
const { GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = require("graphql");
const { RoleEnumType } = require('../../helpers/enums');

const addSREDProject = {
    type: SREDType,
    description: "Create new sred project.",
    args: {
        grantId: {type: GraphQLID },
        company_id: {type: GraphQLID },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        tag: { type: GraphQLString },
        contract: { type: GraphQLString },
        timesheet: { type: GraphQLString },
        T2: { type: GraphQLString },
        T4: { type: GraphQLString },
        projectIntro: { type: GraphQLString },
        supportingDocs: { type: new GraphQLList(GraphQLString) },
        supportingDoc1: { type: GraphQLString },
        supportingDoc2: { type: GraphQLString },
        supportingDoc3: { type: GraphQLString },
    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        console.log('verifiedUser.id \n\n',verifiedUser,'\n\n');
        let newData = {...args}
        newData.userId = verifiedUser._id;
        return await SREDService.create(newData);
    }
}

const updateSREDProject = {
    type: SREDType,
    description: "Update user info",
    args: {
        id: {type: GraphQLID},
        company_id: {type: GraphQLID },
        grantId: {type: GraphQLID },
        userId:{ type: GraphQLID,  },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        tag: { type: GraphQLString },
        contract: { type: GraphQLString },
        timesheet: { type: GraphQLString },
        T2: { type: GraphQLString },
        T4: { type: GraphQLString },
        projectIntro: { type: GraphQLString },
        supportingDocs: { type: new GraphQLList(GraphQLString) },
        supportingDoc1: { type: GraphQLString },
        supportingDoc2: { type: GraphQLString },
        supportingDoc3: { type: GraphQLString },
    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await SREDService.update(args.id, newData);
    }
}
const deleteSREDProject = {
    type: GraphQLBoolean,
    description: "Delete sred project",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await SREDService.delete(args.id);
        return result.n
    }
}

module.exports = { addSREDProject, updateSREDProject, deleteSREDProject }