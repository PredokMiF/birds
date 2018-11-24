const pgAsync = require('../db')

module.exports = async function getUserRoles(id) {
    return await pgAsync.row(`
        SELECT role_name FROM "user_roles" WHERE user_id = $1;`, 
        id
    );
}
