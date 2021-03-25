const express = require('express')
const doseController = require('../controller/doseController')
const { checkSchema } = require('express-validator');
const validator = require('../utils/validator')
function doseApi(app) {
  const router = express.Router()
  app.use('/api/dose', router)

  router.get('/', doseController.get)
  router.get('/:id', doseController.getOne)
  router.patch('/:id', doseController.update)
  router.post('/', checkSchema(validator.medicineRegistrationSchema), doseController.post)
  router.delete('/:id', doseController.delete)
}

module.exports = doseApi