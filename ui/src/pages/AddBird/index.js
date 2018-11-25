import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { refbook as refbookBirdType } from '../../util/refBird'
import { refbook as refbookBirdGender } from '../../util/refGender'
import { refbook as refbookAge } from '../../util/refAge'
import { refbook as refbookCircums } from '../../util/refCircums'

import { validate } from './validate'
import { submit } from './submit'

const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
            <input {...input} type={type} className={'form-control ' + (touched && error ? 'is-invalid' : '')} id={input.name} placeholder={label}/>
            {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>
    </div>
)

const renderSelectField = ({ input, label, type, meta: { touched, error }, list }) => (
    <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        {/*
            <input {...input} type={type} className="form-control" id={input.name} placeholder={label}/>
        </div>*/}
        <div className="col-sm-9">
            <select {...input} className={'form-control ' + (touched && error ? 'is-invalid' : '')} id={input.name} >
                <option value={null}/>
                {list.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
            {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>
    </div>
)

function AddBirdForm(props) {
    const {error, handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Field
                name="bird_type"
                component={renderSelectField}
                label="Bird Name"
                list={refbookBirdType}
            />
            <Field
                name="metal_ring_id"
                type="text"
                component={renderTextField}
                label="Ring Number"
            />
            <Field
                name="date_of_record"
                type="date"
                component={renderTextField}
                label="Date"
            />
            <Field
                name="bird_gender"
                component={renderSelectField}
                label="Gender"
                list={refbookBirdGender}
            />
            <Field
                name="bird_age"
                component={renderSelectField}
                label="Age"
                list={refbookAge}
            />
            <Field
                name="circumstances"
                component={renderSelectField}
                label="Circumstances"
                list={refbookCircums}
            />
            <Field
                name="latitude"
                type="text"
                component={renderTextField}
                label="Latitude"
            />
            <Field
                name="longitude"
                type="text"
                component={renderTextField}
                label="Longitude"
            />
            <div className="form-group row">
                <div className="col-sm-3"/>
                <div className="col-sm-9">
                    {error && <div style={{color: 'red'}}>{error}</div>}

                    <button type="submit" className="btn btn-info" disabled={submitting}>
                        Add
                    </button>
                </div>

            </div>
        </form>
    )
}

const MyForm = reduxForm({
    form: 'addBird',
    validate,
})(AddBirdForm)

export default class MyFormWrapper extends Component {

    state = {
        showForm: true,
        initialValues: {},
    }

    submitHandler = values => {
        this.setState({ initialValues: values, showForm: false })
    }

    addMore = () => {
        this.setState({ showForm: true })
    }

    render(){
        const { initialValues, showForm } = this.state

        if (showForm) {
            return (
                <MyForm initialValues={initialValues} submitHandler={this.submitHandler} />
            )
        }

        return (
            <div>
                <h5>Done!</h5>
                <button type="button" className="btn btn-info" onClick={this.addMore}>Add one more item</button>
            </div>
        )
    }
}
