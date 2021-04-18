const {register, login} = require('./auth');
const { updateUser } = require('./user');
const { addGrants, updateGrants, deleteGrants } = require('./grants');

module.exports = { 
    register, login, 
    updateUser,
    addGrants, updateGrants, deleteGrants 
}
