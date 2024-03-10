export function validatePhone(value) {
    const re = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    return re.test(value) && value.trim().length > 0;
}