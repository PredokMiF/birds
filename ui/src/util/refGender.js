export const refbook = [
    { value: 'F', label: '[F] Female' },
    { value: 'M', label: '[M] Male' },
    { value: 'U', label: '[U] Unknown' },
]

export function getGenderHuman(value) {
    const item = refbook.filter(item => item.value === value)[0]
    return item ? item.label : value
}
