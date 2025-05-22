// utils/passwordValidator.js
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is().min(8).withMessage('at least 8 characters')
  .has().lowercase().withMessage('at least one lowercase letter')
  .has().uppercase().withMessage('at least one uppercase letter')
  .has().digits().withMessage('at least one number')
  .has().symbols().withMessage('at least one symbol')
  .has().not().spaces().withMessage('no spaces allowed');

const validatePassword = (password) => {
  const failures = schema.validate(password, { details: true });
  const messages = failures.map(rule => rule.message);
  return messages;
};

module.exports = validatePassword;
