const {register, login} = require('./auth');
const { updateUser } = require('./user');
const { addGrants, updateGrants, deleteGrants } = require('./grants');
const { addGrantQuestion, updateGrantQuestion, deleteGrantQuestion } = require('./grantQuestion');
const { addGrantOption, updateGrantOption, deleteGrantOption } = require('./grantQuestionOption');
const { addSREDProject, updateSREDProject, deleteSREDProject} = require('./sred');
const { addRole, updateRole, deleteRole } = require('./role');
const { addPermission, updatePermission, deletePermission } = require('./permission');
const { addCompany, updateCompany, deleteCompany } = require('./company');
const { addRolePermission, updateRolePermission, deleteRolePermission } = require('./rolePermission');
const { addEvent, updateEvent, deleteEvent} = require('./event');
const { addEmployee, updateEmployee, deleteEmployee } = require('./employee');

module.exports = { 
    register, login, 
    updateUser,
    addGrants, updateGrants, deleteGrants,
    addGrantQuestion, updateGrantQuestion, deleteGrantQuestion,
    addGrantOption, updateGrantOption, deleteGrantOption,
    addSREDProject, updateSREDProject, deleteSREDProject,
    addRole, updateRole, deleteRole,
    addPermission, updatePermission, deletePermission,
    addCompany, updateCompany, deleteCompany,
    addRolePermission, updateRolePermission, deleteRolePermission ,
    addEvent, updateEvent, deleteEvent,
    addEmployee, updateEmployee, deleteEmployee,

}
