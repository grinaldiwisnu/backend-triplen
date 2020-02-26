const connection = require('../../utils/databases')

const tableName = 'subscription'

module.exports = {
  getSubscriptions: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName}`,
      [],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  getDetailSubscription: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [
        data.id,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  createSubscription: (data, callback) => {
    connection.query(
      `INSERT INTO ${tableName} (id_user, name, price, description, expired, start) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.idUser,
        data.name,
        data.price,
        data.description,
        data.expired,
        data.start,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(res)
      },
    )
  },
}
