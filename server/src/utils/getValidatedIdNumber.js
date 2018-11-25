module.exports = function getValidatedIdNumber(id){
    let validatedId = '';
    if (
        id[id.length - 1].match(/[a-z]/ig) &&
        id.match(/[0-9]/g).length === id.length &&
        id.length < 10) {
        validatedId = '.'.repeat(10 - id.length) + id;
    } else if (id.length < 10) {
        let matched = id.match(/^([0-9a-z]*[a-z])?(\d*)$/i);
        if (!matched) {
            validatedId = '..........'
        } else if (!matched[2]) {
            validatedId = (matched[2] || '') + '.'.repeat(10 - id.length) + (matched[1] || '');
        } else {
            validatedId = (matched[1] || '') + '.'.repeat(10 - id.length) + (matched[2] || '');
        }
    } else {
        validatedId = id;
    }
    return validatedId.toLocaleUpperCase();
}
