const response = require('../utils/response')
const userService = require('../services/userService')

async function createUser(req, res, next) {
  try {
    const data = req.body

    const createdUser = await userService.postUser(data)
    console.log(createdUser)
    response.success(req, res, createdUser.rows[0], '201')
  } catch (error) {
    next(error)
  }
}


module.exports = {
  postUser: createUser
}