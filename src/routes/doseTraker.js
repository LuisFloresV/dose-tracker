const express = require('express')
const doseController = require('../controller/doseController')
// const { checkSchema } = require('express-validator');
// const validator = require('../utils/validator')
const validationHandler = require('../utils/validationHandler')
const { medicineSchema, medicineIdSchema } = require('../schemas/medicine')
require('../utils/auth/jwtStrategy')
const passport = require('passport')
function doseApi(app) {
  const router = express.Router()
  app.use('/api/dose', router)

  router.get('/', passport.authenticate('jwt', { session: false }), doseController.get)
  router.get('/:id', passport.authenticate('jwt', { session: false }), validationHandler({ id: medicineIdSchema }, 'params'), doseController.getOne)
  router.patch('/:id', passport.authenticate('jwt', { session: false }), validationHandler({ id: medicineIdSchema }, 'params'), validationHandler(medicineSchema), doseController.update)
  router.post('/', passport.authenticate('jwt', { session: false }), validationHandler(medicineSchema), doseController.post)
  router.delete('/:id', passport.authenticate('jwt', { session: false }), validationHandler({ id: medicineIdSchema }, 'params'), doseController.delete)
}

module.exports = doseApi