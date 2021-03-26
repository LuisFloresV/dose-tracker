const db = require('../db/postgres')
const { v4: uuidv4 } = require('uuid');
const TABLE = "medicine"

async function getData() {
  return await db.get(TABLE)
}

async function getOne(id) {
  return await db.getOne(TABLE, id)
}

async function postData(data) {
  const generatedUuid = uuidv4()
  return await db.insert(TABLE, data, generatedUuid)
}

async function updateData(id, data) {
  return await db.update(TABLE, id, data)
}
async function deleteData(id) {
  const resp = await db.delete(TABLE, id)
  return resp
}

module.exports = { getData, postData, deleteData, getOne, updateData }