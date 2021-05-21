const { GraphQLList, GraphQLID } = require('graphql');
const { EmployeeType } = require('../types');
const EmployeeService = require('../../services/empolyee');

const allEmployees = {
    type: new GraphQLList(EmployeeType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await EmployeeService.findAll();
    }
}
const empolyeeByCompany = {
    type: new GraphQLList(EmployeeType),
    args: {
        company_id: {type: GraphQLID}
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await EmployeeService.findByCondition({company_id: args.company_id});
    }
}
const empolyee = {
    type: EmployeeType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        // if(!verifiedUser) throw new Error("Unauthorized")

        return await EmployeeService.findById(args.id);
    }
}

module.exports = { allEmployees, empolyeeByCompany, empolyee }