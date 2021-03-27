const doseService = require('../services/doseService')
const response = require('../utils/response')

async function getDose(req, res, next) {
  const { user_id } = req.user
  try {
    const data = await doseService.getData(user_id)
    response.success(req, res, data.rows, 200)
  } catch (error) {
    next(error)
  }
}

async function getOneDose(req, res, next) {
  const { id } = req.params
  const { user_id } = req.user
  try {
    const data = await doseService.getOne(id, user_id)
    if (data.rowCount === 0) {
      response.success(req, res, "No data", 200)
    } else {
      response.success(req, res, data.rows, 200)
    }
  } catch (error) {
    next(error)
  }
}
async function postDose(req, res, next) {
  const { user_id } = req.user
  try {
    const data = req.body
    const postedDose = await doseService.postData(data, user_id)
    response.success(req, res, `Inserted: ${postedDose.rows[0].id} ${postedDose.rows[0].name}`, '201')
  } catch (error) {
    next(error)
  }
}

async function updateDose(req, res, next) {
  const { user_id } = req.user
  try {
    const { id } = req.params
    const data = req.body
    const updatedDose = await doseService.updateData(id, data, user_id)
    response.success(req, res, `Updated: ${updatedDose.rows[0].id}`, '200')
  }
  catch (error) {
    next(error)
  }
}

async function deleteDose(req, res, next) {
  const { user_id } = req.user
  try {
    const { id } = req.params
    const deletedDose = await doseService.deleteData(id, user_id)
    if (deletedDose === 1) {
      response.success(req, res, `${deletedDose} rows affected`, '200')
    }
    else {
      response.error(req, res, `${deletedDose} rows affected`, '500')
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  get: getDose,
  post: postDose,
  delete: deleteDose,
  getOne: getOneDose,
  update: updateDose
}