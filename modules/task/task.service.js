const connection = require('./../../utils/databases')

const tableName = 'task'

module.exports = {
  getId: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id = ? AND id_user = ?`,
      [
        data.id,
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  update: (data, callback) => {
    connection.query(
      `UPDATE ${tableName} SET task = ?, location = ?, latitude = ?, longitude = ?, date = ?, status = ? WHERE id = ? AND id_user = ?`,
      [
        data.name,
        data.location,
        data.latitude,
        data.longitude,
        data.date,
        data.status,
        data.id,
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  create: (data, callback) => {
    connection.query(
      `INSERT INTO ${tableName} (id_user, id_board, task, location, latitude, longitude, date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.idUser,
        data.id,
        data.name,
        data.location,
        data.latitude,
        data.longitude,
        data.date,
        data.status,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  deleteId: (data, callback) => {
    connection.query(
      `DELETE FROM ${tableName} WHERE id = ? AND id_user = ?`,
      [
        data.id,
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  updateBudget: (data, callback) => {
    connection.query(
      `UPDATE ${tableName} SET budget = ?, status = 0 WHERE id = ? AND id_user = ?`,
      [
        data.budget,
        data.id,
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
}
