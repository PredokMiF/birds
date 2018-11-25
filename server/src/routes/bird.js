const birdGetById = require('../dao/birdGetById');
const birdPost = require('../dao/birdPost');
const getBirdsByApprovedValue = require('../dao/getBirdsByApprovedValue')
const getCurrentUserBirdsRecords = require('../dao/getCurrentUserBirdsRecords')
const approveBirdRecordById = require('../dao/approveBirdRecordById')
const getBirdsReportByYear = require('../dao/getBirdsReportByYear')
const getBirdCodesByYear = require('../dao/getBirdCodesByYear')

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
        const myId = ctx.session.passport.user
        const isManager = ctx.state.user.roles.includes('manager')
        const data = await birdPost(ctx.request.body, myId, isManager, isManager ? myId : null);
        ctx.body = data;
    },

    getCurrentUserRecords: async function (ctx) {
        const data = await getCurrentUserBirdsRecords(ctx.session.passport.user);
        ctx.body = data.rows;
    },

    getRecordsByApprovedValue: async function (ctx) {
        const data = await getBirdsByApprovedValue(ctx.query.value);
        ctx.body = data.rows;
    },

    approveRecordById: async function (ctx) {
        const data = await approveBirdRecordById(ctx.request.body.id, ctx.session.passport.user);
        ctx.body = data;
    },

    getReportByYear: async function (ctx) {
        const data = await getBirdsReportByYear(ctx.params.year);
        ctx.body = data.rows;
    },

    getCodesByYear: async function (ctx) {
        const data = await getBirdCodesByYear(ctx.params.year);
        ctx.body = data;
    },
}
