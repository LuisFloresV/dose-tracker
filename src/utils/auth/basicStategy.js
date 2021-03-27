const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const usersService = require('../../services/userService')


passport.use(
  new BasicStrategy(async function (email, password, cb) {

    try {
      const data = await usersService.getUser(email)
      const user = data.rows[0]
    

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error)
    }
  })
)