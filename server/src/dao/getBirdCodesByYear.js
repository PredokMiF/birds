const pgAsync = require('../db');
const generateBirdCode = require('../utils/generateBirdCode');

module.exports = async function getBirdsReportByYear(year) {
    const result = await pgAsync.query(`SELECT * FROM bird WHERE EXTRACT(year FROM "date_of_record") = ${parseInt(year, 10)}`);
    
    return result.rows.map((rec) => {
        return { id: rec.id, code: generateBirdCode(rec) };
    });
}
