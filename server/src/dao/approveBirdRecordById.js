const pgAsync = require('../db')

module.exports = async function approveBirdRecordById(recordId) {
    return await pgAsync.query(`UPDATE "bird" SET approved=true WHERE id=${parseInt(recordId, 10)};`);
}
