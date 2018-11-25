import axios from 'axios'
import React, { Component } from 'react';

import { getAgeHuman } from '../../util/refAge'
import { getBirdHuman } from '../../util/refBird'
import { getGenderHuman } from '../../util/refGender'
import { getCircumstancesHuman } from '../../util/refCircums'
import {Redirect} from "react-router-dom";

class ReportsAllPerYear extends Component {

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

        axios.get(`/api/bird-report/${year}`).then(({ data }) => {
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
                        <th scope="col">Date</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Bird</th>
                        <th scope="col">Ring</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Circumstances</th>
                        <th scope="col">Approved</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({ id, date_of_record, latitude, longitude, bird_type, metal_ring_id, bird_gender, bird_age, circumstances, approved }) => {
                        return (
                            <tr key={id}>
                                <td>{new Date(date_of_record).toLocaleDateString()}</td>
                                <td>{latitude}</td>
                                <td>{longitude}</td>
                                <td>{getBirdHuman(bird_type)}</td>
                                <td>{metal_ring_id}</td>
                                <td>{getGenderHuman(bird_gender)}</td>
                                <td>{getAgeHuman(bird_age)}</td>
                                <td>{getCircumstancesHuman(circumstances)}</td>
                                <td>{approved ? 'approved' : ''}</td>
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

export default ReportsAllPerYear
