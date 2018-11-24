const pgAsync = require('../db')

module.exports = async function birdGetById(id) {
    return await pgAsync.query(`SELECT * FROM bird WHERE metal_ring_id='${id}';`);
}
