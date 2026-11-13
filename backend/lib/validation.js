const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
const id = value => /^\d+$/.test(String(value)) && Number.isSafeInteger(Number(value)) && Number(value) > 0;
module.exports = { text, id };
