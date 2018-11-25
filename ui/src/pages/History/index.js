import axios from 'axios'
import React, { Component } from 'react';

import { getAgeHuman } from '../../util/refAge'
import { getBirdHuman } from '../../util/refBird'
import { getGenderHuman } from '../../util/refGender'
import { getCircumstancesHuman } from '../../util/refCircums'
import {Redirect} from "react-router-dom";

class History extends Component {

    state = {
        loading: false,
        data: null,
        linkTo: '',
    }

    componentDidMount(){
        this.setState({ loading: true })
        axios.get('/api/birds-by-user').then(({ data }) => {
            this.setState({ loading: false, data })
        })
    }

    redirectToAdd = () => {
        this.setState({ linkTo: '/add' })
    }

    render() {
        const { loading, data, linkTo } = this.state

        if (linkTo) {
            return <Redirect to={linkTo}/>
        }

        let body

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
                <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ display: 'inline-block', margin: 0, lineHeight: '38px' }}>My Birds</h3>
                    <button style={{ verticalAlign: 'top', marginLeft: '15px' }} type="button" className="btn btn-info" onClick={this.redirectToAdd}>Add New Observation</button>
                </div>

                {body}
            </div>
        )
    }
}

export default History
