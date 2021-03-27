require('dotenv').config()
const { response } = require('express')
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const generatorQuery = require('../utils/queryGen')
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const get = async function (table) {

  const resp = generatorQuery.getGenerator(table)
  const data = await pool.query(resp.query)
  return data
}


const getOne = async function (table, param) {
  const resp = generatorQuery.getOneGenerator(table, param)
  const data = await pool.query(resp.query, resp.values)
  return data
}

const insert = async function (table, data, uuid = "") {
  // let query = ""
  // let values = ""
  // if (table === "medicine") {
  //   query = 'INSERT INTO medicine VALUES ($1, $2, $3, $4) RETURNING *'
  //   values = [data.id, data.name, data.dosage, data.frequency]
  // }
  const resp = generatorQuery.insertGenerator(table, data, uuid)
  return await pool.query(resp.query, resp.values)
}

const update = async function (table, id, data) {
  const resp = generatorQuery.updateGenerator(table, id, data)
  return await pool.query(resp.query, resp.values)
}
const deleteOne = async function (table, id) {
  const resp = generatorQuery.deleteGenerator(table, id)
  const res = await pool.query(resp.query, resp.values)
  return res.rowCount
}

module.exports = { get, insert, delete: deleteOne, getOne, update }