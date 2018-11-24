const path = require('path')
const mount = require('koa-mount')
const serve = require('koa-static')

module.exports = app => {
    const staticDir = path.resolve(__dirname, '../../../ui/build')
    app.use(mount('/app', serve(staticDir)))
}
