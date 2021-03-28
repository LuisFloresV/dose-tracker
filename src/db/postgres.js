require('dotenv').config()
const { response } = require('express')
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'
const generatorQuery = require('../utils/queryGen')
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false
})

const get = async function (table, user_id = "") {

  const resp = generatorQuery.getGenerator(table, user_id)
  const data = await pool.query(resp.query, [resp.user_id])
  return data
}


const getOne = async function (table, param, user_id) {
  const resp = generatorQuery.getOneGenerator(table, param, user_id)
  const data = await pool.query(resp.query, resp.values)
  return data
}

const insert = async function (table, data, uuid = "", user_id = "") {
  // let query = ""
  // let values = ""
  // if (table === "medicine") {
  //   query = 'INSERT INTO medicine VALUES ($1, $2, $3, $4) RETURNING *'
  //   values = [data.id, data.name, data.dosage, data.frequency]
  // }
  const resp = generatorQuery.insertGenerator(table, data, uuid, user_id)
  return await pool.query(resp.query, resp.values)
}

const update = async function (table, id, data, user_id) {
  const resp = generatorQuery.updateGenerator(table, id, data, user_id)
  return await pool.query(resp.query, resp.values)
}
const deleteOne = async function (table, id, user_id) {
  const resp = generatorQuery.deleteGenerator(table, id, user_id)
  const res = await pool.query(resp.query, resp.values)
  return res.rowCount
}

module.exports = { get, insert, delete: deleteOne, getOne, update }