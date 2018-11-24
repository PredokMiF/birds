import axios from 'axios'
import queryString from 'query-string'
import React, { Component } from 'react'

class Bird extends Component {

    state = {
        currNumber: null,
        loading: false,
        result: null,
    }

    componentDidMount(){
        this.search()
        /*const { hash } = window.location

        if (hash.includes('?')) {
            const query = hash.substr(hash.indexOf('?'))
            const { number } = queryString.parse(query)

            if (number) {
                this.setState({ loading: true })

                axios.get(`/api/bird/${number}`).then(({ data }) => {
                    this.setState({
                        loading: false,
                        result: data,
                    })
                })
            }
        }*/
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
                    result: data,
                })
            })
        }
    }

    render() {
        const { loading, result } = this.state

        console.log(window.location.hash)

        if (loading) {
            return <div>...Loading</div>
        }

        if (!result || !result.length) {
            return <div>Nothing found</div>
        }

        return (
            <div>Bird</div>
        )
    }
}

export default Bird
