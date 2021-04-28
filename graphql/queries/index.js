const {user, users} = require('./user');
const {grant, grants} = require('./grants');
const {grantQuestion, grantQuestions} = require('./grantQuestion');
const {grantOption} = require('./grantQuestionOption');
const {allSREDProjects, SREDProjects, SREDProject} = require('./sred');

module.exports = { 
    user, users,
    grant, grants,
    grantQuestion, grantQuestions,
    grantOption,
    allSREDProjects, SREDProjects, SREDProject
    
 }
