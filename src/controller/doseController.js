const doseService = require('../services/doseService')
const response = require('../utils/response')

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
    if (data.rowCount === 0) {
      response.success(req, res, "No data", 200)
    } else {
      response.success(req, res, data.rows, 200)
    }
  } catch (error) {
    response.error(req, res, error, '500')
  }
}
async function postDose(req, res, next) {
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
      response.success(req, res, `${deletedDose} rows affected`, '200')
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