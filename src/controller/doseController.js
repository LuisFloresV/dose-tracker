const doseService = require('../services/doseService')
const { validationResult } = require('express-validator');
const response = require('../utils/response')
const boom = require('@hapi/boom')

async function getDose(req, res, next) {
  try {
    const data = await doseService.getData()
    response.success(req, res, data.rows, 200)
  } catch (error) {
    response.error(req, res, error, '500')
  }
}

async function getOneDose(req, res, next) {
  const { id } = req.params
  try {
    const data = await doseService.getOne(id)
    response.success(req, res, data.rows, 200)
  } catch (error) {
    response.error(req, res, error, '500')
  }
}
async function postDose(req, res, next) {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   // throw new Error(errors.array())
  //   next(errors)
  //   // return res.status(400).json({ errors: errors.array() });
  // }
  try {
    const data = req.body
    const postedDose = await doseService.postData(data)
    response.success(req, res, `Inserted: ${postedDose.rows[0].id} ${postedDose.rows[0].name}`, '201')
  } catch (error) {
    next(error)
  }
}

async function updateDose(req, res, next) {
  try {
    const { id } = req.params
    const data = req.body
    console.log(data, id)
    const updatedDose = await doseService.updateData(id, data)
    response.success(req, res, `Updated: ${updatedDose.rows[0].id}`, '200')
  }
  catch (error) {
    response.error(req, res, error, '500')
  }
}

async function deleteDose(req, res, next) {
  try {
    const { id } = req.params
    const deletedDose = await doseService.deleteData(id)
    if (deletedDose === 1) {
      response.success(req, res, deletedDose, '200')
    }
    else {
      response.error(req, res, `${deletedDose} rows affected`, '500')
    }
  } catch (error) {
    response.error(req, res, error, '500')
  }
}


module.exports = {
  get: getDose,
  post: postDose,
  delete: deleteDose,
  getOne: getOneDose,
  update: updateDose
}