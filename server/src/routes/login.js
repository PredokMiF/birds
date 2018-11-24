const _ = require('lodash')
const passport = require('koa-passport')

const logger = require('../logger')

module.exports = {
    get: async function(ctx) {
        if (ctx.isUnauthenticated()) {
            ctx.body = ctx.render('/login', {})
        } else {
            ctx.redirect('/app');
        }
    },
    
    post: async function (ctx) {
        return passport.authenticate('local', async function(err, user, info, status) {
            err && ctx.throw(err)
            if (user === false) {
                logger.warn('Ошибка авторизации')
                ctx.body = ctx.render('/login', {error: "Wrong login or password. Please try again."})
            } else {
                await ctx.login(user)
                ctx.redirect('/app');
            }
        })(ctx)
    }
};
