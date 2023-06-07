const validator = require('validator')

module.exports = function registerVal (userdata) {
  let errors = {}
  let isValid = true
  if (validator.isEmpty(userdata.name)) {
    errors.name = 'input name'
    isValid = false
  }
  if (validator.isEmpty(userdata.password)) {
    errors.password = 'input password';
    isValid = false
}
  if (validator.isEmpty(userdata.repassword)) {
    errors.repassword = 'input repassword';
    isValid = false
}
  if (validator.isEmpty(userdata.email)) {
    errors.email = 'input email';
    isValid = false
}else {
    if (!validator.isEmail(userdata.email)) {
        errors.email = 'input email form';
        isValid = false}
  }
  if (userdata.password !== userdata.password) {
    errors.password = 'confirm worng';
    isValid = false}
  console.log(errors, isValid)
  return {isValid,errors}
}
