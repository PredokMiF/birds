import axios from 'axios'
import { SubmissionError } from 'redux-form'

export function submit(values, a, props) {
    return axios.post('/api/bird', values).then(
        () => {
            props.submitHandler(values)
        },
        e => {
            throw new SubmissionError({ _error: 'Request failed!' })
        }
    )
}
