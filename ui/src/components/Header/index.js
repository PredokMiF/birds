import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";

import { hasRole, doLogout } from '../../sec/user'
import './style.css'


class Header extends Component {

    state ={
        q: '',
    }

    typing = e => {
        this.setState({ q: e.target.value })
    }

    onSearch = (e) => {
        const { q } = this.state

        e.preventDefault()
        this.setState({ find: q })
    }

    componentDidUpdate(){
        const { find } = this.state

        if (find) {
            this.setState({find: ''})
        }
    }

    render() {
        const { isAdmin, isManager, isReporter, doLogout } = this.props
        const { q, find } = this.state

        if (find) {
            return <Redirect to={`/bird?number=${find}`}/>
        }

        const isReporterOnly = isReporter && !isManager && !isAdmin

        return (
            <nav className="navbar navbar-expand navbar-light bg-light">
                <a className="navbar-brand" href="/app">Save the Birds</a>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {isReporterOnly && <li className="nav-item">
                            <Link className="nav-link" to="/history">History</Link>
                        </li>}
                        {isManager && <li className="nav-item">
                            <Link className="nav-link" to="/reports">Reports</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Add New Observation</Link>
                        </li>
                        {isManager && <li className="nav-item">
                            <Link className="nav-link" to="/approve">Approve</Link>
                        </li>}
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.onSearch}>
                        <input className="form-control mr-sm-2" type="search" value={q} onChange={this.typing} placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <button className="logout-btn btn btn-outline-info my-2 my-sm-0" type="button" onClick={doLogout} title="logout">
                        <svg
                            version="1.1"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12,10c1.1,0,2-0.9,2-2V4c0-1.1-0.9-2-2-2s-2,0.9-2,2v4C10,9.1,10.9,10,12,10z"/>
                            <path d="M19.1,4.9L19.1,4.9c-0.3-0.3-0.6-0.4-1.1-0.4c-0.8,0-1.5,0.7-1.5,1.5c0,0.4,0.2,0.8,0.4,1.1l0,0c0,0,0,0,0,0c0,0,0,0,0,0    c1.3,1.3,2,3,2,4.9c0,3.9-3.1,7-7,7s-7-3.1-7-7c0-1.9,0.8-3.7,2.1-4.9l0,0C7.3,6.8,7.5,6.4,7.5,6c0-0.8-0.7-1.5-1.5-1.5    c-0.4,0-0.8,0.2-1.1,0.4l0,0C3.1,6.7,2,9.2,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,9.2,20.9,6.7,19.1,4.9z"/>
                        </svg>
                    </button>
                </div>
            </nav>
        )
    }
}

export default connect(state => ({
    isAdmin: hasRole(state, 'admin'),
    isManager: hasRole(state, 'manager'),
    isReporter: hasRole(state, 'reporter'),
}), {
    doLogout,
})(Header)

