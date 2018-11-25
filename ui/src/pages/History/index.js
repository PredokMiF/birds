import axios from 'axios'
import React, { Component } from 'react';

import { getAgeHuman } from '../../util/refAge'
import { getBirdHuman } from '../../util/refBird'
import { getGenderHuman } from '../../util/refGender'
import { getCircumstancesHuman } from '../../util/refCircums'

class History extends Component {

    state = {
        loading: false,
        data: null,
    }

    componentDidMount(){
        this.setState({ loading: true })
        axios.get('/api/birds-by-user').then(({ data }) => {
            this.setState({ loading: false, data })
        })
    }

    render() {
        const { loading, data } = this.state

        if (loading) {
            return <div>Loading...</div>
        }

        if (!data || !data.length) {
            return <div>Nothing found</div>
        }

        return (
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
                    <th scope="col">circumstances</th>
                    <th scope="col">approved</th>
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
}

export default History
