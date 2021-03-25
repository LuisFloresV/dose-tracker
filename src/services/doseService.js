const db = require('../db/postgres')
const TABLE = "medicine"

async function getData() {
  return await db.get(TABLE)
}

async function postData(data) {
  return await db.insert(TABLE, data)
}

module.exports = { getData, postData }