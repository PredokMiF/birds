const pgAsync = require('../db')

module.exports = async function getBirdsRecordsByUserId(userId) {
    return await pgAsync.query(`SELECT * FROM bird WHERE user_id=${parseInt(userId)};`);
}
