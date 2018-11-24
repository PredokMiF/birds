const pgAsync = require('../db')

module.exports = async function getBirdsReportByYear(year) {
    return await pgAsync.query(`SELECT * FROM bird WHERE EXTRACT(year FROM "date_of_record") = ${parseInt(year, 10)}`);
}
