export function validateFullName(value, name) {
    const re = /^\p{Letter}+$/u;
    if (name === 'patronymic') {
        return re.test(value) || value.trim().length === 0;
    }
    return re.test(value);
}