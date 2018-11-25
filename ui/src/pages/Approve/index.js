import axios from 'axios'
import React, { Component } from 'react'

import {getBirdHuman} from "../../util/refBird";
import {getGenderHuman} from "../../util/refGender";
import {getAgeHuman} from "../../util/refAge";
import {getCircumstancesHuman} from "../../util/refCircums";


class Approve extends Component {

    state = {
        loading: false,
        data: null,
    }

    componentDidMount(){
        this.search()
    }

    search() {
        this.setState({ loading: true })
        axios.get(`/api/bird/approved?value=false`).then(({ data }) => {
            this.setState({
                loading: false,
                data,
            })
        })
    }

    approve(id){
        axios.post('/api/approve-record', { id }).then(() => {
            this.search()
        })
    }

    render() {
        const { loading, data } = this.state

        if (loading) {
            return <div>...Loading</div>
        }

        if (!data || !data.length) {
            return <div>Nothing to approve</div>
        }

        return (
            <div>
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
                        <th scope="col">Approve</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({ id, date_of_record, latitude, longitude, bird_type, metal_ring_id, bird_gender, bird_age, circumstances }) => {
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
                                <td>
                                    <button type="button" className="btn btn-primary btn-sm" onClick={() => { this.approve(id)}}>Approve</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Approve
