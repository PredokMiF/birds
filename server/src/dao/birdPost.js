const pgAsync = require('../db')

module.exports = async function birdPost(data, user_id, approved = false, approver_id = null) {
    return await pgAsync.query(`INSERT INTO "bird" (date_of_record, latitude, longitude, bird_type, metal_ring_id, bird_gender, bird_age, circumstances, approved, user_id, approver_id) 
	    VALUES (
	    CURRENT_TIMESTAMP,
	    '${data.latitude}',
	    '${data.longitude}',
	    '${data.bird_type}',
	    '${data.metal_ring_id}',
	    '${data.bird_gender}',
	    '${data.bird_age}',
	    '${data.circumstances}',
	    ${approved},
	    ${user_id},
	    ${approver_id}
	    );`
    )
}
