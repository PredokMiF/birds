export const refbook = [
 { value: '0', label: '[0] Unknown' },
 { value: '1', label: '[1] Pullus' },
 { value: '2', label: '[2] Full-grown' },
 { value: '3', label: '[3] First-year' },
 { value: '4', label: '[4] After first-year' },
 { value: '5', label: '[5] 2nd year' },
 { value: '6', label: '[6] After 2nd year' },
 { value: '7', label: '[7] 3rd year' },
 { value: '8', label: '[8] After 3rd year' },
 { value: '9', label: '[9] 4th year' },
 { value: 'A', label: '[A] After 4th year' },
 { value: 'B', label: '[B] 5th year' },
 { value: 'C', label: '[C] After 5th year' },
 { value: 'D', label: '[D] 6th year' },
 { value: 'E', label: '[E] After 6th year' },
 { value: 'F', label: '[F] 7th year' },
 { value: 'G', label: '[G] After 7th year' },
 { value: 'H', label: '[H] 8th year' },
 { value: 'J', label: '[J] After 8th year' },
 { value: 'K', label: '[K] 9th year' },
 { value: 'L', label: '[L] After 9th year' },
 { value: 'M', label: '[M] 10th year' },
 { value: 'N', label: '[N] After 10th year' },
 { value: 'P', label: '[P] 11th year' },
 { value: 'Q', label: '[Q] After 11th year' },
 { value: 'R', label: '[R] 12th year' },
 { value: 'S', label: '[S] After 12th year' },
 { value: 'T', label: '[T] 13th year' },
 { value: 'U', label: '[U] After 13th year' },
 { value: 'V', label: '[V] 14th year' },
 { value: 'W', label: '[W] After 14th year' },
 { value: 'X', label: '[X] 15th year' },
 { value: 'Y', label: '[Y] After 15th years' },
 { value: 'Z', label: '[Z] 16th year' },
]

export function getAgeHuman(value) {
    const item = refbook.filter(item => item.value === value)[0]
    return item ? item.label : value
}
