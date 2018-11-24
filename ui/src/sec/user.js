export const STORE_KEY = 'user'
const LOGIN_USER = 'user@login'
const LOGOUT_USER = 'user@logout'


export function reducer(state = {}, action) {
    switch (action.type) {

        case LOGIN_USER: {
            state = { ...action.payload, authorized: true }
            return state
        }

        case LOGOUT_USER:
            return { authorized: false }

        default:
            return state
    }
}

export function doLogin({ id, login, roles }) {
    return {
        type: LOGIN_USER,
        payload: { id, login, roles }
    }
}

export function doLogout() {
    return {
        type: LOGOUT_USER
    }
}

export function isAuthorised(state) {
    return state[STORE_KEY].authorized
}

export function hasRole(state, role) {
    return isAuthorised() && state[STORE_KEY].roles.includes(role)
}
