import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { submit } from './submit'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const AddBirdForm = props => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Field
                name="date"
                type="date"
                component={renderField}
                label="Username"
            />
            <Field
                name="bird"
                type="text"
                component={renderField}
                label="Птица"
            />
            <Field
                name="number"
                type="text"
                component={renderField}
                label="Номер метал. кольца"
            />
            <Field
                name="sex"
                type="text"
                component={renderField}
                label="Пол"
            />
            <Field
                name="circumstances"
                type="text"
                component={renderField}
                label="Оюстоятельства"
            />
            <Field
                name="d1"
                type="text"
                component={renderField}
                label="Широта"
            />
            <Field
                name="d2"
                type="text"
                component={renderField}
                label="Долгота"
            />
            {error && <strong>{error}</strong>}
            <div>
                <button type="submit" disabled={submitting}>
                    Log In
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'addBird'
})(AddBirdForm)
