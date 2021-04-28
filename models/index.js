const User = require('./userModel');
const Grants = require('./grantsModel');
const GrantQuestion = require('./grantQuestionModel');
const GrantOption = require('./grantOptionModel');
const SRED = require('./sredModel');

module.exports = {
    User, Grants, 
    GrantQuestion, GrantOption,
    SRED,
}