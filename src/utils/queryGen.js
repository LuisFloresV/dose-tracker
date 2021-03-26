const insertGenerator = function (table, data, uuid) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "INSERT INTO medicine VALUES ($1, $2, $3, $4) RETURNING *"
      values = [uuid, data.name, data.dosage, data.frequency]
      return { query, values }
    default:
      query = ""
      break
  }
}

const getGenerator = function (table) {
  let query = ""
  switch (table) {
    case 'medicine':
      query = "SELECT * FROM medicine ORDER BY id ASC"
      return { query }
    default:
      query = ""
      break
  }
}

const getOneGenerator = function (table, id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "SELECT * FROM medicine WHERE id = $1"
      values = [id]
      return { query, values }
    default:
      query = ""
      break
  }
}

const updateGenerator = function (table, id, data) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "UPDATE medicine SET name = $1, dosage = $2, frequency = $3 WHERE id = $4 RETURNING *"
      values = [data.name, data.dosage, data.frequency, id]
      return { query, values }
    default:
      query = ""
      break
  }
}

const deleteGenerator = function (table, id) {
  let query = ""
  let values = ""
  switch (table) {
    case 'medicine':
      query = "DELETE FROM medicine WHERE id = $1"
      values = [id]
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