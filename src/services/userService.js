const db = require('../db/postgres')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const TABLE = "users"


async function postUser(data) {
  const generatedUuid = uuidv4()
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = {
    id: generatedUuid,
    email: data.email,
    password: hashedPassword,
    username: data.username
  }
  return await db.insert(TABLE, user)
}

async function getUser(email) {
  return await db.getOne(TABLE, email)
}


module.exports = { postUser, getUser }