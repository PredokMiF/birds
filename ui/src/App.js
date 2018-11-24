import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { isAuthorised } from './sec/user';

import Header from './Header';
import Login from './pages/Login';
import Report from './pages/Report';
import AddBird from './pages/AddBird';

class AppBase extends Component {
    render() {
        const { authorized } = this.props

        if (!authorized) {
            return <Login/>
        }

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/report" component={Report}/>
                    <Route component={AddBird}/>
                </Switch>
            </div>
        );
    }
}

const App = connect(state => ({
    authorized: isAuthorised(state),
}))(AppBase)

export default App;
