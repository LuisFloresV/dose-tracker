const boom = require('@hapi/boom')
const response = require('../utils/response')
function notFoundHandler(req, res) {
  const { output: { statusCode, payload } } = boom.notFound()
  response.error(req, res, payload.message, statusCode)
}
module.exports = notFoundHandler