module.exports = async function (ctx) {
    ctx.logout()
    delete ctx.session.user

    let type = ctx.accepts('html', 'json')
    if (type === 'json') {
        ctx.body = { result: 'ok '}
    } else {
        ctx.redirect('/app');
    }

}
