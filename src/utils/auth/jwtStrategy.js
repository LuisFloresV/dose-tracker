const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const usersService = require('../../services/userService')

const config = require('../../config')

passport.use(
  new Strategy({
    secretOrKey: config.SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
    async function (tokenPayload, cb) {
      try {
        const data = await usersService.getUser(tokenPayload.email)
        const user = data.rows[0]
        if (!user) {
          return cb(boom.unauthorized(), false)
        }
        delete user.password
        cb(null, user)
      } catch (error) {
        return cb(error)
      }
    }
  )
)