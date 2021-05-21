const { EmployeeType } = require("../types");
// const  User = require("../../models/userModel");
const Employee = require('../../services/empolyee')
const { GraphQLString, GraphQLID, GraphQLBoolean,GraphQLFloat,GraphQLInt } = require("graphql");

const addEmployee = {
    type: EmployeeType,
    description: "Create new Employee. Required: name, company_id",
    args: {
        name: {type: GraphQLString},
        education:{type: GraphQLString},
        position:{type: GraphQLString},
        nature:{type: GraphQLString},
        experience:{type: GraphQLString},
        sred_hours:{type: GraphQLFloat},
        total_hours:{type: GraphQLFloat},
        sred_salary:{type: GraphQLFloat},
        total_salary:{type: GraphQLFloat},
        year:{type: GraphQLInt},
        company_id:{type: GraphQLString},
        remark: {type: GraphQLString},
        status: {type: GraphQLString},
    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await Employee.create(newData);
    }
}

const updateEmployee = {
    type: EmployeeType,
    description: "Update Employee",
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        education:{type: GraphQLString},
        position:{type: GraphQLString},
        nature:{type: GraphQLString},
        experience:{type: GraphQLString},
        sred_hours:{type: GraphQLFloat},
        total_hours:{type: GraphQLFloat},
        sred_salary:{type: GraphQLFloat},
        total_salary:{type: GraphQLFloat},
        year:{type: GraphQLInt},
        company_id:{type: GraphQLString},
        remark: {type: GraphQLString},
        status: {type: GraphQLString},
    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await Employee.update(args.id, newData);
    }
}
const deleteEmployee = {
    type: GraphQLBoolean,
    description: "Delete Empolyee",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await Employee.delete(args.id);
        return result.n
    }
}

module.exports = { addEmployee, updateEmployee, deleteEmployee }