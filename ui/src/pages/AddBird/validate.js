export const validate = values => {
    const errors = {}

    if (!values.bird_type) {
        errors.bird_type = 'Required'
    }

    if (!values.metal_ring_id) {
        errors.metal_ring_id = 'Required'
    }

    if (!values.date_of_record) {
        errors.date_of_record = 'Required'
    }

    if (!values.bird_gender) {
        errors.bird_gender = 'Required'
    }

    if (!values.bird_age) {
        errors.bird_age = 'Required'
    }

    if (!values.circumstances) {
        errors.circumstances = 'Required'
    }

    if (!values.latitude) {
        errors.latitude = 'Required'
    }

    if (!values.longitude) {
        errors.longitude = 'Required'
    }

    return errors
}
