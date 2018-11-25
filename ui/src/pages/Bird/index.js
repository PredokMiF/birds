import axios from 'axios'
import queryString from 'query-string'
import React, { Component } from 'react'
import { YMaps, Map, Clusterer, Placemark } from 'react-yandex-maps';

import {getBirdHuman} from "../../util/refBird";
import {getGenderHuman} from "../../util/refGender";
import {getAgeHuman} from "../../util/refAge";
import {getCircumstancesHuman} from "../../util/refCircums";
import {Redirect} from "react-router-dom";

class Bird extends Component {

    state = {
        currNumber: null,
        loading: false,
        data: null,
        gridShown: false,
        linkTo: '',
    }

    componentDidMount(){
        this.search()
    }

    componentDidUpdate(){
        this.search()
    }

    search() {
        const { currNumber } = this.state
        let number = null
        const { hash } = window.location

        if (hash.includes('?')) {
            const query = hash.substr(hash.indexOf('?'))
            const parsedQuery = queryString.parse(query)
            if (parsedQuery.number || parsedQuery.number === '') {
                number = parsedQuery.number
            }
        }

        if (currNumber !== number) {
            this.setState({ currNumber: number, loading: true })

            axios.get(`/api/bird/${number}`).then(({ data }) => {
                this.setState({
                    loading: false,
                    data,
                })
            })
        }
    }

    toggleGrid = () => {
        const { gridShown } = this.state

        this.setState({ gridShown: !gridShown })
    }

    redirectToAdd = () => {
        this.setState({ linkTo: '/add' })
    }

    render() {
        const { loading, data, gridShown, linkTo } = this.state

        if (linkTo) {
            return <Redirect to={linkTo}/>
        }

        if (loading) {
            return <div>...Loading</div>
        }

        if (!data || !data.length) {
            return <div>Nothing found</div>
        }

        const { date_of_record, latitude, longitude, bird_type, metal_ring_id, bird_gender, bird_age, circumstances } = data[0]
        const mapState = {
            center: [0, 0],
            zoom: 1,
        }

        if (gridShown) {
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

                    <button type="button" className="btn btn-outline-dark" onClick={this.toggleGrid} style={{ position: 'fixed', left: 20, bottom: 20 }}>
                        Back to My Birds
                    </button>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <form style={{ width: '100%'}}>
                        <div className="form-group row">
                            <h2 className="col-sm-12">{getBirdHuman(bird_type)}</h2>
                        </div>
                        <div className="form-group row">
                            <h4 className="col-sm-12">Registration Data</h4>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="metal_ring_id" className="col-sm-2 col-form-label font-weight-bold">Ring Number</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="metal_ring_id" value={metal_ring_id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="date_of_record" className="col-sm-2 col-form-label font-weight-bold">Registration Date</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="date_of_record" value={new Date(date_of_record).toLocaleDateString()}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="bird_gender" className="col-sm-2 col-form-label font-weight-bold">Sex</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="bird_gender" value={getGenderHuman(bird_gender)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="bird_age" className="col-sm-2 col-form-label font-weight-bold">Age</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="bird_age" value={getAgeHuman(bird_age)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="circumstances" className="col-sm-2 col-form-label font-weight-bold">Circumstances</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="circumstances" value={getCircumstancesHuman(circumstances)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="gps" className="col-sm-2 col-form-label font-weight-bold">GPS</label>
                            <div className="col-sm-10">
                                <input type="text" readOnly className="form-control-plaintext" id="gps" value={latitude + ' ' + longitude}/>
                            </div>
                        </div>
                    </form>

                    <div className="row" style={{ marginBottom: 16 }}>
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-info" onClick={this.redirectToAdd}>Add Observation</button>
                            &nbsp;
                            <button type="button" className="btn btn-info" onClick={this.toggleGrid}>All Registrations</button>
                        </div>
                    </div>

                    <YMaps>
                        <Map defaultState={mapState} style={{height: 400, width: "100%"}}>
                            <Clusterer
                                options={{
                                    preset: 'islands#invertedVioletClusterIcons',
                                    groupByCoordinates: false,
                                }}
                            >
                                {data.map(({ id, latitude, longitude }) => ({ id, coordinates: [latitude, longitude]})).map(({ id, coordinates}) => (
                                    <Placemark key={id} geometry={coordinates} />
                                ))}
                            </Clusterer>
                        </Map>
                    </YMaps>
                </div>
            </div>
        )
    }
}

export default Bird
