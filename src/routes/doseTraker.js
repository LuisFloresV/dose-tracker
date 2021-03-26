const express = require('express')
const doseController = require('../controller/doseController')
// const { checkSchema } = require('express-validator');
// const validator = require('../utils/validator')
const validationHandler = require('../utils/validationHandler')
const { medicineSchema, medicineIdSchema } = require('../schemas/medicine')

function doseApi(app) {
  const router = express.Router()
  app.use('/api/dose', router)

  router.get('/', doseController.get)
  router.get('/:id', validationHandler({ id: medicineIdSchema }, 'params'), doseController.getOne)
  router.patch('/:id', validationHandler({ id: medicineSchema }), validationHandler(medicineSchema), doseController.update)
  router.post('/', validationHandler(medicineSchema), doseController.post)
  router.delete('/:id', validationHandler({ id: medicineIdSchema }, 'params'), doseController.delete)
}

module.exports = doseApi