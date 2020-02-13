const connection = require('./../../utils/databases')

const tableName = 'users'

module.exports = {
  signIn: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id_google = ? AND email = ?`,
      [
        data.id_google,
        data.email,
      ],
      (err, res) => {
        if (err) { return callback(err) }

        return callback(null, res)
      },
    )
  },
  checkUser: (data, callback) => {
    connection.query(
      `SELECT * FROM ${tableName} WHERE id_google = ?`,
      [
        data.id_google,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  register: (data, callback) => {
    connection.query(
      `INSERT INTO ${tableName} (id_google, name, email, no_telp, img_url) VALUES (?, ?, ?, ?, ?)`,
      [
        data.id_google,
        data.name,
        data.email,
        data.no,
        data.image,
      ],
      (err, res) => {
        if (err) return callback(err)

        return callback(null, res)
      },
    )
  },
  checkUserId: (data, callback) => {
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
}
