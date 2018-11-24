import { createStore as createReduxStore, combineReducers, compose, applyMiddleware } from 'redux'


// REDUCERS

import { reducer as form } from 'redux-form'
import { STORE_KEY as USER_SORE_KEY, reducer as userReducer } from './sec/user'
import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'


const finalReducer = combineReducers({
    form,

    [USER_SORE_KEY]: userReducer,
})


// MIDDLEWARES

const finalMiddleware = compose(
    applyMiddleware(
        thunk,
        // securityMiddleware,
        // (DEVELOPMENT ? createLogger() : (store => next => action => next(action)))
    ),
    window && window.devToolsExtension ? window.devToolsExtension() : f => f
);


// STORE

export function createStore() {
    const store = createReduxStore(
        finalReducer,
        {},
        finalMiddleware
    )

    return store
}
