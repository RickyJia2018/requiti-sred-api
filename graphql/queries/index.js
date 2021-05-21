const {user, users, usersByCompany} = require('./user');
const {grant, grants} = require('./grants');
const {grantQuestion, grantQuestions} = require('./grantQuestion');
const {grantOption} = require('./grantQuestionOption');
const {allSREDProjects, SREDProjects, SREDProject, SREDProjectsByCompany} = require('./sred');
const {allRoles, role, roles} = require('./role');
const {allPermissions, permissions, permission} = require('./permission');
const {companies, company} = require('./company');
const { allRolePermissions, rolePermissions } = require('./rolePermission');
const {allEvents, event, eventsByCompany, eventsByUser } = require('./event');
module.exports = { 
    user, users,usersByCompany,
    grant, grants,
    grantQuestion, grantQuestions,
    grantOption,
    allSREDProjects, SREDProjects, SREDProject,SREDProjectsByCompany,
    allRoles, role, roles,
    allPermissions, permissions, permission,
    companies, company,
    allRolePermissions, rolePermissions,
    allEvents, event, eventsByCompany, eventsByUser,
 }
