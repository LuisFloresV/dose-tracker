const express = require('express')
const userController = require('../controller/userController')
// const { checkSchema } = require('express-validator');
// const validator = require('../utils/validator')
const validationHandler = require('../utils/validationHandler')
const { userSchema } = require('../schemas/users')

function userApi(app) {
  const router = express.Router()
  app.use('/api/user', router)

  router.post('/signup', validationHandler(userSchema), userController.postUser)
  router.post('/sign-in', userController.signIn )

}

module.exports = userApi