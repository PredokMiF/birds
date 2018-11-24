module.exports = async function user(ctx) {
    const authorized = ctx.isAuthenticated()

    ctx.body = {
        authorized,
        user: authorized ? ({
            id: ctx.state.user.id,
            login: ctx.state.user.login,
            roles: ctx.state.user.roles
        }) : null,
    }
}
