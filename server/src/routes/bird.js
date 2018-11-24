const birdGetById = require('../dao/birdGetById');
const birdPost = require('../dao/birdPost');
const getBirdsByApprovedValue = require('../dao/getBirdsByApprovedValue')
const getBirdsRecordsByUserId = require('../dao/getBirdsRecordsByUserId')

module.exports = {
    getBirdByMetalRingId: async function (ctx) {
        const data = await birdGetById(ctx.params.id);
        ctx.body = data.rows;
    },

    /**
     * Example of request.body:
     * 
     * {
     * 	"latitude": "50",
     * 	"longitude": "50",
     * 	"bird_type": "Twitter",
     * 	"metal_ring_id": "TWI123",
     * 	"bird_gender": "F",
     * 	"bird_age": "7-8 years",
     * 	"circumstances": "circumstances text",
     * 	"approved": false,
     * 	"user_id": 3,
     * 	"approver_id": 1
     * }
     * 
     */
    postNewBird: async function (ctx) {
        const data = await birdPost(ctx.request.body);
        ctx.body = data;
    },

    getRecordsByUserId: async function (ctx) {
        const data = await getBirdsRecordsByUserId(ctx.params.id);
        ctx.body = data.rows;
    },

    getRecordsByApprovedValue: async function (ctx) {
        const data = await getBirdsByApprovedValue(ctx.params.value);
        ctx.body = data.rows;
    },
}
