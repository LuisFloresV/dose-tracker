const express = require('express')
const doseController = require('../controller/doseController')

function doseApi(app) {
  const router = express.Router()
  app.use('/api/dose', router)

  router.get('/', doseController.get)
  router.post('/', doseController.post)
}

module.exports = doseApi