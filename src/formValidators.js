const ValidateEmail = (mail) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
const ValidatePhone = (mobile) => (/^\d{10}$/.test(mobile))
const ValidatePW = (pw) => (pw.length > 7)
const notEmpty = (str) => (str.length > 0)
const ValidatePin = (pin) => (/^\d{6}$/.test(pin))
export { ValidateEmail, ValidatePW, ValidatePhone, notEmpty, ValidatePin }