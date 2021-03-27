const insertGenerator = function (table, data, uuid, user_id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "INSERT INTO medicine VALUES ($1, $2, $3, $4, $5) RETURNING *"
      values = [uuid, data.name, data.dosage, data.frequency, user_id]
      return { query, values }
    case 'users':
      query = "INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING *"
      values = [data.id, data.email, data.password, data.username]
      return { query, values }
    default:
      query = ""
      break
  }
}

const getGenerator = function (table, user_id) {
  let query = ""
  switch (table) {
    case 'medicine':
      query = "SELECT * FROM medicine WHERE user_id = $1 ORDER BY id ASC"
      return { query, user_id }
    default:
      query = ""
      break
  }
}

const getOneGenerator = function (table, param, user_id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "SELECT * FROM medicine WHERE id = $1 AND user_id = $2"
      values = [param, user_id]
      return { query, values }
    case 'users':
      query = "SELECT * FROM users WHERE email = $1"
      values = [param]
      return { query, values }
    default:
      query = ""
      break
  }
}

const updateGenerator = function (table, id, data, user_id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "UPDATE medicine SET name = $1, dosage = $2, frequency = $3 WHERE id = $4 AND user_id = $5 RETURNING *"
      values = [data.name, data.dosage, data.frequency, id, user_id]
      return { query, values }
    default:
      query = ""
      break
  }
}

const deleteGenerator = function (table, id, user_id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "DELETE FROM medicine WHERE id = $1 AND user_id = $2"
      values = [id, user_id]
      return { query, values }
    default:
      query = ""
      break
  }
}

module.exports = {
  insertGenerator,
  deleteGenerator,
  getGenerator,
  getOneGenerator,
  updateGenerator
}