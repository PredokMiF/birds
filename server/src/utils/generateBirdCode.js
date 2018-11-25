const getValidatedIdNumber = require('./getValidatedIdNumber');
const defaultRecord = {
    scheme: 'BYM',
    primary_id_method: 'A0',
    id_number: '0000000000', //JAM
    metal_ring_verification: '0',
    metal_ring_information: '1',
    other_marks: 'ZZ',
    species: '00030', // bird code //JAM
    species_as_concluded: '00030', //JAM
    manipulation: 'U',
    moved_before: '0',
    catching_method: 'Z',
    lures_used: 'U',
    sex_reported: 'U', //JAM
    sex_concluded: 'U', //JAM
    age_reported: '0', //JAM
    age_concluded: '0', //JAM
    status: 'U',
    brood_size: 'U',
    pullus_age: '--',
    pullus_age_accuracy: '---',
    date: '01011970', //JAM
    date_accuracy: '0',
    time: '----',
    place_code: 'BY25', // Minsk region //JAM
    coordinates: '+539293+0276847', //JAM
    coordinates_accuracy: '1',
    condition: '8',
    circumstances_code: '20',
    circumstances_presumed: '0',
    code_id: '3',
    distance: '-----',
    direction: '---',
    elapsed_time: '-----'
}

// EURING 2000+ code
module.exports = function generateBirdCode(birdRecord){
    const codeArray = [
        birdRecord.scheme || defaultRecord.scheme,
        birdRecord.primary_id_method || defaultRecord.primary_id_method,
        birdRecord.metal_ring_id ? getValidatedIdNumber(birdRecord.metal_ring_id) : defaultRecord.id_number,
        birdRecord.metal_ring_verification || defaultRecord.metal_ring_verification,
        birdRecord.metal_ring_information || defaultRecord.metal_ring_information,
        birdRecord.other_marks || defaultRecord.other_marks,
        birdRecord.species || defaultRecord.species,
        birdRecord.species_as_concluded || defaultRecord.species_as_concluded,
        birdRecord.manipulation || defaultRecord.manipulation,
        birdRecord.moved_before || defaultRecord.moved_before,
        birdRecord.catching_method || defaultRecord.catching_method,
        birdRecord.lures_used || defaultRecord.lures_used,
        birdRecord.bird_gender || defaultRecord.sex_reported,
        birdRecord.bird_gender || defaultRecord.sex_concluded,
        birdRecord.bird_age || defaultRecord.age_reported,
        birdRecord.bird_age || defaultRecord.age_concluded,
        birdRecord.status || defaultRecord.status,
        birdRecord.brood_size || defaultRecord.brood_size,
        birdRecord.pullus_age || defaultRecord.pullus_age,
        birdRecord.pullus_age_accuracy || defaultRecord.pullus_age_accuracy,
        birdRecord.date_of_record 
        ? `${birdRecord.date_of_record.getDate()}${birdRecord.date_of_record.getMonth()+1}${birdRecord.date_of_record.getFullYear()}`
        : defaultRecord.date,
        birdRecord.date_accuracy || defaultRecord.date_accuracy,
        birdRecord.time || defaultRecord.time,
        birdRecord.place_code || defaultRecord.place_code,
        birdRecord.latitude && birdRecord.longitude ?birdRecord.latitude.slice(0, 8).replace('.', '') + birdRecord.longitude.slice(0, 9).replace('.', '') : defaultRecord.coordinates,
        birdRecord.coordinates_accuracy || defaultRecord.coordinates_accuracy,
        birdRecord.condition || defaultRecord.condition,
        birdRecord.circumstances_code || defaultRecord.circumstances_code,
        birdRecord.circumstances_presumed || defaultRecord.circumstances_presumed,
        birdRecord.code_id || defaultRecord.code_id,
        birdRecord.distance || defaultRecord.distance,
        birdRecord.direction || defaultRecord.direction,
        birdRecord.elapsed_time || defaultRecord.elapsed_time
    ];

    return codeArray.join('|');
}
