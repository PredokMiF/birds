module.exports = async function user(ctx) {
    ctx.body = { 
        authorized: ctx.isAuthenticated(),
        user: {
            id: ctx.state.user.id,
            login: ctx.state.user.login,
            roles: ctx.state.user.roles
        }
    }
}
