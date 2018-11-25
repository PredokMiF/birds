const pgAsync = require('../db')

module.exports = async function approveBirdRecordById(recordId, approver_id) {
    return await pgAsync.query(`UPDATE "bird" SET approved=true, approver_id=${approver_id} WHERE id=${parseInt(recordId, 10)};`);
}
