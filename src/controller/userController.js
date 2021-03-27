
const response = require('../utils/response')
const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const config = require('../config')
const passport = require('passport')
const boom = require('@hapi/boom')

require('../utils/auth/basicStategy')

async function createUser(req, res, next) {
  try {
    const data = req.body
    const createdUser = await userService.postUser(data)
    response.success(req, res, createdUser.rows[0], '201')
  } catch (error) {
    next(error)
  }
}


function signInUser(req, res, next) {

  passport.authenticate('basic', function (error, user) {
    if (error || !user) { return next(error) }
    req.login(user, { session: false }, function (error) {
      if (error) { return next(error) }
      const payload = {
        sub: user.user_id,
        username: user.user_name,
        email: user.email
      }
      const token = jwt.sign(payload, config.SECRET, {
        expiresIn: '15m'
      })
      response.success(req, res, token, '200')
    })

  })(req, res, next)
}


module.exports = {
  postUser: createUser,
  signIn: signInUser
}