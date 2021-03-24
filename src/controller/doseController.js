function getDose(req, res, next) {
  res.status(200).send({ "Hello": "Dose" })
}

module.exports = {
  get: getDose
}