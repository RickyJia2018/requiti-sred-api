const { CompanyType } = require("../types");
// const  User = require("../../models/userModel");
const Company = require('../../services/company')
const { GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = require("graphql");

const addCompany = {
    type: CompanyType,
    description: "Create new company.",
    args: {
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        country: { type: GraphQLString },
        province: { type: GraphQLString },
        city: { type: GraphQLString },
        address: { type: GraphQLString },
        postCode: { type: GraphQLString },
        manager:{ type: GraphQLID },

    },
    async resolve(parent, args,{verifiedUser}){    
        // if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await Company.create(newData);
    }
}

const updateCompany = {
    type: CompanyType,
    description: "Update company",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        country: { type: GraphQLString },
        province: { type: GraphQLString },
        city: { type: GraphQLString },
        address: { type: GraphQLString },
        postCode: { type: GraphQLString },
        manager:{ type: GraphQLID },
        permissions:{ type: new GraphQLList(GraphQLString) },

    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await Company.update(args.id, newData);
    }
}
const deleteCompany = {
    type: GraphQLBoolean,
    description: "Delete company",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await Company.delete(args.id);
        return result.n
    }
}

module.exports = { addCompany, updateCompany, deleteCompany }