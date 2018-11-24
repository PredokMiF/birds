import axios from 'axios'


export const STORE_KEY = 'user'
const LOGIN_USER = 'user@login'
const LOGOUT_USER = 'user@logout'


// AC

export function setLogined({ id, login, roles }) {
    return {
        type: LOGIN_USER,
        payload: { id, login, roles }
    }
}

export function setLogouted() {
    return {
        type: LOGOUT_USER
    }
}


// AC smart

export const doLogout = () => dispatch => {
    axios.post('/api/logout').then(() => {
        dispatch(setLogouted())
    })
}


// REDUCER

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


// Getters

export function isAuthorised(state) {
    return state[STORE_KEY].authorized
}

export function hasRole(state, role) {
    return isAuthorised(state) && state[STORE_KEY].roles.includes(role)
}
