import React, { Component } from 'react'


class Login extends Component {

    static propTypes = {

    };

    render () {
        window.location.assign('/api/login')

        return (
            <div>
                Login
            </div>
        )
    }

}

export default Login
