const { request } = require('express')
const db = require('../db/postgres')
const doseService = require('../services/doseService')

async function getDose(req, res, next) {
  const response = await doseService.getData()
  res.status(200).json(response.rows)
}

async function postDose(req, res, next) {
  const data = req.body
  console.log(data)
  const response = await doseService.postData(data)
  res.status(200).json(response.rows)
}

module.exports = {
  get: getDose,
  post: postDose
}