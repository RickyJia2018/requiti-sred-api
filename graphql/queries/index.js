const {user, users} = require('./user');
const {grant, grants} = require('./grants');
const {grantQuestion, grantQuestions} = require('./grantQuestion');
const {grantOption} = require('./grantQuestionOption');
const {allSREDProjects, SREDProjects, SREDProject} = require('./sred');
const {allRoles, role, roles} = require('./role');
const {allPermissions, permissions, permission} = require('./permission');
const {companies, company} = require('./company');
const { allRolePermissions, rolePermissions } = require('./rolePermission');

module.exports = { 
    user, users,
    grant, grants,
    grantQuestion, grantQuestions,
    grantOption,
    allSREDProjects, SREDProjects, SREDProject,
    allRoles, role, roles,
    allPermissions, permissions, permission,
    companies, company,
    allRolePermissions, rolePermissions,
 }
