import axios from 'axios'
import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import { createStore } from './store'
import { doLogin, doLogout } from './sec/user'
import App from './App'

import './app.css'

axios.post('/api/user').then(({ data: { authorized, user }}) => {
    const store = createStore()

    if (authorized) {
        const { id, login, roles } = user
        store.dispatch(doLogin({ id, login, roles }))
    } else {
        store.dispatch(doLogout())
    }

    if(process.env.NODE_ENV !== 'production') {
        window.axios = axios
        window.store = store
    }

    ReactDOM.render(<Application />, document.getElementById('root'))

    function Application () {
        return (
            <Router>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Router>
        )
    }
})
