const pgAsync = require('../db')

module.exports = async function getBirdsByApprovedValue(value) {
    const boolValue = value === 'true';
    return await pgAsync.query(`SELECT * FROM bird WHERE approved=${boolValue};`);
}
