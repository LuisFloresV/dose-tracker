const success = function (req, res, message = '', status = 200) {
  res.status(status).send(
    {
      error: false,
      status: status,
      response: message
    }
  )
}

const error = function (req, res, message = 'Internal Server Error', status = 500) {
  res.status(status).send(
    {
      error: true,
      status: status,
      response: message
    }
  )
}

module.exports = {
  success,
  error
}