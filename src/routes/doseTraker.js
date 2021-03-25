const express = require('express')
const doseController = require('../controller/doseController')
const {checkSchema} = require('express-validator');
const validator = require('../utils/validator')
function doseApi(app) {
  const router = express.Router()
  app.use('/api/dose', router)

  router.get('/', checkSchema(validator.medicineRegistrationSchema), doseController.get)
  router.post('/', checkSchema(validator.medicineRegistrationSchema), doseController.post)
}

module.exports = doseApi