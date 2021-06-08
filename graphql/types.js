const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt} = require("graphql");
const {RoleEnumType} = require('../helpers/enums')
const Models = require('../models')
const GrantService = require('../services/grants');
const UserService = require('../services/users');
const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        company: {
            type: CompanyType,
            resolve(parent, args) {
                return Models
                    .Company
                    .findById(parent.company_id)
            }
        },
        role: {
            type: RoleType,
            resolve(parent, args) {
                return Models
                    .Role
                    .findById(parent.role_id)
            }
        },
        phone: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        alter_contact: {
            type: GraphQLString
        }
    })
})
const CompanyType = new GraphQLObjectType({
    name: "Company",
    description: "Company type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        province: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        postCode: {
            type: GraphQLString
        },
        manager: {
            type: GraphQLID
        },
        permissions:{
            type: new GraphQLList(GraphQLString)
        },
        status: {
            type: GraphQLString
        },
        users: {
            type: UserType,
            resolve(parent, args) {
                return Models
                    .User
                    .find({company_id: parent.id});
            }
        }
    })
})

const GrantType = new GraphQLObjectType({
    name: "Grant",
    description: "Grant type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        funds_amount: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        tag: {
            type: GraphQLString
        }
    })
})
const GrantQuestionType = new GraphQLObjectType({
    name: "GrantQuestion",
    description: "Questions type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        options: {
            type: new GraphQLList(GrantOptionType),
            resolve(parent, args) {
                return Models
                    .GrantOption
                    .find({questionId: parent.id})
            }
        }
    })
})

const GrantOptionType = new GraphQLObjectType({
    name: "GrantOption",
    description: "Options type.",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        grants: {
            type: new GraphQLList(GrantType),
            async resolve(parent, args) {
                return await GrantService.findByIds(parent.grants);
            }
        }
    })
})
const SREDType = new GraphQLObjectType({
    name: "SRED",
    description: "SRED type",
    fields: () => ({
        id: {            type: GraphQLID        },
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
    })
})
const RoleType = new GraphQLObjectType({
    name: "Role",
    description: "Role type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        user: {
            type: UserType,
            async resolve(parent, args) {
                return UserService.findByCondition({role_id: parent.id})
            }
        },
        name: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        company: {
            type: CompanyType,
            resolve(parent, args) {
                return Models
                    .Company
                    .findById(parent.company_id);
            }
        },
        permissions: {
            type: PermissionType,
            resolve(parent, args) {
                return Models
                    .Permission
                    .find({role_id: parent.id})
            }
        }
    })
})
const PermissionType = new GraphQLObjectType({
    name: "Permission",
    description: "Permission type",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        resource: {
            type: GraphQLString
        },
        action: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        }
    })
})

const RolePermissionType = new GraphQLObjectType({
    name: "RolePermission",
    description: "bind role and permission",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        role_id: {
            type: GraphQLID
        },
        permission_id: {
            type: GraphQLID
        },
        permission:{
            type: PermissionType,
            resolve(parent,args){
                return Models.Permission.findById(parent.permission_id);
            }
        }
    })
})

const EventType = new GraphQLObjectType({
    name: "Event",
    description: "Event",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        hours: {
            type: GraphQLFloat
        },
        employee_id:{
            type: GraphQLString
        },
        user_id: {
            type: GraphQLString
        },
        user:{
            type: UserType,
            resolve(parent,args){
                return Models.User.findById(parent.user_id);
            }
        },
        company_id: {
            type: GraphQLID
        },
        company:{
            type: CompanyType,
            resolve(parent,args){
                return Models.Company.findById(parent.company_id);
            }
        },
        allDay: {
            type: GraphQLString
        },
        start: {
            type: GraphQLString
        },
        end: {
            type: GraphQLString
        },
        color: {
            type: GraphQLString
        }
    })
})

const EmployeeType = new GraphQLObjectType({
    name: "Emplyee",
    fields: () => ({
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
        company_id:{type: GraphQLID},
        user_id:{type: GraphQLID},
        user:{type: UserType, resolve(parent, args){
            return Models.User.findById(parent.user_id);
        }},
        remark: {type: GraphQLString},
        status: {type: GraphQLString},
    })
})


module.exports = {
    UserType,
    GrantType,
    CompanyType,
    GrantQuestionType,
    GrantOptionType,
    SREDType,
    RoleType,
    PermissionType,
    RolePermissionType,
    EventType,EmployeeType,
};