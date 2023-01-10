const Joi = require('joi')

const userSchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required()
})

module.exports = userSchema
