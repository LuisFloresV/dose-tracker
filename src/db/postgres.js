require('dotenv').config()
const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const get = async function (table) {
  const data = await pool.query(`SELECT * FROM ${table}`)
  return data
}

const insert = async function (table, data) {
  let query = ""
  let values = ""
  if (table === "medicine") {
    query = 'INSERT INTO medicine VALUES ($1, $2, $3, $4) RETURNING *'
    values = [data.id, data.name, data.dosage, data.frequency]
  }
  return await pool.query(query, values)
}


module.exports = { get, insert }