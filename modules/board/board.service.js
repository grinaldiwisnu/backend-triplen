const connection = require('./../../utils/databases')

const tableName = 'boards'

module.exports = {
  create: (data, callback) => {
    connection.query(
      `INSERT INTO ${tableName} (id_user, board, status, date) VALUES (?, ?, ?, ?)`,
      [
        data.idUser,
        data.name,
        1,
        data.date,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  getAll: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id_user = ?`,
      [
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  getFiltered: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id_user = ? AND status = ?`,
      [
        data.idUser,
        data.status,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  update: (data, callback) => {
    connection.query(
      `UPDATE ${tableName} SET board = ?, status = ? WHERE id_user = ? AND id = ?`,
      [
        data.name,
        data.status,
        data.idUser,
        data.idBoard,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(err, res)
      },
    )
  },
  getId: (data, callback) => {
    connection.query(
      `SELECT t.id, b.board, b.id AS id_board, t.task, t.location, t.status, t.date, t.latitude, t.longitude, t.budget FROM ${tableName} b JOIN task t ON t.id_board = b.id WHERE b.id = ? AND b.id_user = ? AND t.id_user = ? ORDER BY t.date ASC`,
      [
        data.id,
        data.idUser,
        data.idUser,
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
  getHistory: (data, callback) => {
    connection.query(
      'SELECT b.id, b.board, b.id_user, b.status, b.date, b.created, SUM(t.budget) AS total, MAX(t.date) AS done, MIN(t.date) AS start FROM boards b JOIN task t ON t.id_board = b.id WHERE b.status = 0 AND b.id_user = ? ORDER BY b.date ASC',
      [
        data.idUser,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
}
