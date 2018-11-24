import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { isAuthorised } from './sec/user';

import Header from './components/Header';
import Login from './pages/Login';
import Report from './pages/Report';
import Bird from './pages/Bird';
import AddBird from './pages/AddBird';

class AppBase extends Component {
    render() {
        const { authorized } = this.props

        if (!authorized) {
            return <Login/>
        }

        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/bird" component={Bird}/>
                        <Route path="/reports" component={Report}/>
                        <Route path="/add" component={AddBird}/>
                        <Route component={AddBird}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const App = connect(state => ({
    authorized: isAuthorised(state),
}))(AppBase)

export default App;
