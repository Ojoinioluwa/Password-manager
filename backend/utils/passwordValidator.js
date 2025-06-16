// utils/passwordValidator.js
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is().min(8)
  .has().lowercase()
  .has().uppercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

const ruleMessages = {
  min: "Password must be at least 8 characters long",
  lowercase: "Password must contain at least one lowercase letter",
  uppercase: "Password must contain at least one uppercase letter",
  digits: "Password must contain at least one number",
  symbols: "Password must contain at least one symbol",
  spaces: "Password must not contain spaces"
};

const validatePassword = (password) => {
  const failures = schema.validate(password, { details: true });
  const messages = failures.map(rule => ruleMessages[rule.validation]);
  return messages;
};

module.exports = validatePassword;
