const {register, login} = require('./auth');
const { updateUser } = require('./user');
const { addGrants, updateGrants, deleteGrants } = require('./grants');
const { addGrantQuestion, updateGrantQuestion, deleteGrantQuestion } = require('./grantQuestion');

const { addGrantOption, updateGrantOption, deleteGrantOption } = require('./grantQuestionOption');
const {addSREDProject, updateSREDProject, deleteSREDProject} = require('./sred');
module.exports = { 
    register, login, 
    updateUser,
    addGrants, updateGrants, deleteGrants,
    addGrantQuestion, updateGrantQuestion, deleteGrantQuestion,
    addGrantOption, updateGrantOption, deleteGrantOption,
    addSREDProject, updateSREDProject, deleteSREDProject,
}
