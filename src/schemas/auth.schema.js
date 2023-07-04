const joi = require('joi');

const email = joi.string();
const password = joi.string().max(40);
const token = joi.string();

const sendRecovery = joi.object({
  email: email.required()
});

const logIn = joi.object({
  email: email.required(),
  password: password.required()
});

const resetPass = joi.object({
  token,
  password: password.required()
})
  
module.exports = {sendRecovery, logIn, resetPass};