const joi = require('joi')



const userEmailSchema = joi.string().email()
const userUserNameSchema = joi.string().max(20)
const userPasswordSchema = joi.string().regex(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)


const userSchema = joi.object({
  email: userEmailSchema.required(),
  username: userUserNameSchema.required(),
  password: userPasswordSchema.required()
})

module.exports = {
  userSchema
}
