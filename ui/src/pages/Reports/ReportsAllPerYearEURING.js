import axios from 'axios'
import React, { Component } from 'react';

import {Redirect} from "react-router-dom";

class ReportsAllPerYearEURING extends Component {

    state = {
        year: new Date().getFullYear().toString(),
        loading: false,
        data: null,
        linkTo: '',
    }

    componentDidMount(){
        this.load()
    }

    goBack = () => {
        this.setState({ linkTo: '/reports' })
    }

    typing = e => {
        this.setState({ year: e.target.value })
    }

    load = (e) => {
        const { year } = this.state

        if (e) {
            e.preventDefault()
        }

        if (!year.match(/^[12]\d{3}$/)) {
            return
        }

        this.setState({ loading: true })

        axios.get(`/api/bird-code-report/${year}`).then(({ data }) => {
            this.setState({ loading: false, data })
        })
    }

    render() {
        let body
        const { loading, data, year, linkTo } = this.state

        if (linkTo) {
            return <Redirect to={linkTo}/>
        }

        if (loading) {
            body = <div>Loading...</div>
        } else if (!data || !data.length) {
            body = <div>Nothing found</div>
        } else {
            body = (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">EURING Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({ id, code }) => {
                        return (
                            <tr key={id}>
                                <td>{code}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )
        }

        return (
            <div>
                <div style={{ marginBottom: 20 }}>
                    <form className="form-inline my-2 my-lg-0" onSubmit={this.load}>
                        <input className="form-control mr-sm-2" type="search" value={year} onChange={this.typing} placeholder="year" aria-label="Search" style={{ background: (year.match(/^[12]\d{3}$/)) ? 'white' : '#fdacac'}}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>

                {body}

                <button type="button" className="btn btn-outline-dark" onClick={this.goBack} style={{ position: 'fixed', left: 20, bottom: 20 }}>
                    Back to index
                </button>
            </div>
        )
    }
}

export default ReportsAllPerYearEURING
