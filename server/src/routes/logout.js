module.exports = async function (ctx) {
    ctx.logout()
    delete ctx.session.user
    ctx.redirect('/app');
}
