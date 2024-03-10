export function validateEmail(value) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(value);
}

export function validateFullName(value, name) {
    const re = /^\p{Letter}+$/u;
    if (name === 'patronymic') {
        return re.test(value) || value.trim().length === 0;
    }
    return re.test(value);
}

export function validatePhone(value) {
    const re = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    return re.test(value) && value.trim().length > 0;
}

export function validateSNILS(value) {
    const re = /^\d{3}-\d{3}-\d{3} \d{2}$/;
    return re.test(value) || value.trim().length === 0;
}