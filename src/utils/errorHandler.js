const config = require('../config')
const response = require('./response')
const boom = require('@hapi/boom')

function withErrorStack(error, stack) {
  if (config.DEV) {
    return { ...error, stack }
  }
  return error
}

function logErrors(err, req, res, next) {
  console.log(err)
  next(err)
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation("Something is not working"))
  }
  next(err)
}


function errorHandler(err, req, res, next) {
  const message = withErrorStack(err, err.stack)
  const final = {
    output: message.output,
    stack: message.stack
  }
  response.error(req, res, final, '500')
}

module.exports = {
  logErrors,
  errorHandler,
  wrapError
}