const User = require('./userModel');
const Grants = require('./grantsModel');
const GrantQuestion = require('./grantQuestionModel');
const GrantOption = require('./grantOptionModel');
const SRED = require('./sredModel');
const Role = require('./rolesModel');
const Permission = require('./permissionsModel');
const Company = require('./companiesModel');

module.exports = {
    User, Grants, 
    GrantQuestion, GrantOption,
    SRED, Role,
    Permission, Company,
}