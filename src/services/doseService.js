const db = require('../db/postgres')
const { v4: uuidv4 } = require('uuid');
const TABLE = "medicine"

async function getData(user_id) {
  return await db.get(TABLE, user_id)
}

async function getOne(id, user_id) {
  return await db.getOne(TABLE, id, user_id)
}

async function postData(data, user_id) {
  const generatedUuid = uuidv4()
  return await db.insert(TABLE, data, generatedUuid, user_id)
}

async function updateData(id, data, user_id) {
  return await db.update(TABLE, id, data, user_id)
}
async function deleteData(id, user_id) {
  const resp = await db.delete(TABLE, id, user_id)
  return resp
}

module.exports = { getData, postData, deleteData, getOne, updateData }