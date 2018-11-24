const KoaRouter = require('koa-router')

const router = KoaRouter()

function authNeed(fn) {
    return async function (ctx, next) {
        if (ctx.isUnauthenticated()) {
            ctx.throw(401)
        }

        return await fn(ctx, next)
    }
}

router
    .get('/api/login', require('./login').get)
    .post('/api/login', require('./login').post)
    .post('/api/user', require('./user'))
    .get('/api/logout', require('./logout'))
    .post('/api/logout', require('./logout'))

    // .post('/custom/api/upload', authNeed(require('../api/uploadFile')))

module.exports = app => {
    app.use(router.routes())
    app.use(router.allowedMethods())
}
