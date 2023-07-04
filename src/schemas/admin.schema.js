const joi = require('joi');


const id = joi.number().integer();
const email = joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } });
const password = joi.string().max(100);
const recovery_token = joi.string().max(150);

const createAdminSchema = joi.object({
  email: email.required(),
  password: password.required()
});


const updateAdminSchema = joi.object({
  email,
  password
})

const getAdminSchema = joi.object({
  id: id.required()
});


module.exports = {createAdminSchema, getAdminSchema,updateAdminSchema};