export function validateSNILS(value) {
    const re = /^\d{3}-\d{3}-\d{3} \d{2}$/;
    return re.test(value) || value.trim().length === 0;
}