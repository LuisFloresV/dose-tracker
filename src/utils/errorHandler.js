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
    next(boom.badImplementation(err))
  }
  next(err)
}

function errors(err, req, res, next) {
  const { output: { statusCode, payload } } = err
  response.error(req, res, withErrorStack(payload, err.stack), statusCode)
}


module.exports = {
  wrapError,
  logErrors,
  errors,
}