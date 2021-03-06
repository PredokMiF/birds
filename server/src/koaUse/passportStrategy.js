const passport = require('koa-passport')

const logger = require('../logger')
const userGet = require('../dao/userGet')
const userGetByLoginPass = require('../dao/userGetByLoginPass')
const getUserRoles = require('../dao/getUserRoles');


passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await userGet(id)
        const roles = await getUserRoles(id)
        user.roles = roles
        done(null, user)
    } catch(err) {
        logger.error('passport.deserializeUser error', err)
        done(err)
    }
})


const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function(username, password, done) {
    userGetByLoginPass(username, password)
        .then(user => {
            if (user) {
                return getUserRoles(user.id).then(roles => {
                    user.roles = roles;    
                    return user;
                });
            } 
            
            return user;
        })
        .then(user => {
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
        .catch(err => {
            logger.error('passport -> LocalStrategy -> userGetByLoginPass error', err)
            done(err)
        })
}))

module.exports = function(app) {
    app.use(passport.initialize())
    app.use(passport.session())
}
