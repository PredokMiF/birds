import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import {hasRole, isAuthorised} from './sec/user';

import Header from './components/Header';
import Login from './pages/Login';
import History from './pages/History';
import Reports from './pages/Reports';
import ReportsAllPerYear from './pages/Reports/ReportsAllPerYear';
import ReportsAllPerYearEURING from './pages/Reports/ReportsAllPerYearEURING';
import AddBird from './pages/AddBird';
import Approve from './pages/Approve';
import Bird from './pages/Bird';

class AppBase extends Component {
    render() {
        const { authorized, isAdmin, isManager, isReporter } = this.props

        if (!authorized) {
            return <Login/>
        }

        const isReporterOnly = isReporter && !isManager && !isAdmin

        return (
            <Router>
                <div>
                    <Header/>
                    <div className="body">
                        <Switch>
                            {isReporterOnly && <Route path="/history" component={History}/>}
                            {isManager && <Route path="/reports/allPerYear" component={ReportsAllPerYear}/>}
                            {isManager && <Route path="/reports/allPerYearEURING" component={ReportsAllPerYearEURING}/>}
                            {isManager && <Route path="/reports" component={Reports}/>}
                            <Route path="/add" component={AddBird}/>
                            {isManager && <Route path="/approve" component={Approve}/>}
                            <Route path="/bird" component={Bird}/>
                            {isReporterOnly && <Route component={History}/>}
                            {!isReporterOnly && <Route component={AddBird}/>}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const App = connect(state => ({
    authorized: isAuthorised(state),
    isAdmin: hasRole(state, 'admin'),
    isManager: hasRole(state, 'manager'),
    isReporter: hasRole(state, 'reporter'),
}))(AppBase)

export default App;
