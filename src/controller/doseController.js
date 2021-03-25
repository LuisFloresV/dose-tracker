const doseService = require('../services/doseService')
const { validationResult } = require('express-validator');
const response = require('../utils/response')

async function getDose(req, res, next) {
  try {
    const data = await doseService.getData()
    response.success(req, res, data.rows, 200)
  } catch (error) {
    response.error(req, res, error, '500')
  }

}

async function postDose(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = req.body
    console.log(data)
    const postedDose = await doseService.postData(data)
    response.success(req, res, postedDose.rows[0], '201')
  } catch (error) {
    response.error(req, res, error, '500')
  }

}

module.exports = {
  get: getDose,
  post: postDose
}