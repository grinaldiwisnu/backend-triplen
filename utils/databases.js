const pool = require('mysql')

module.exports = pool.createPool({
  database: 'api_triplen',
  host: 'localhost',
  user: 'root',
  password: 'root',
  connectionLimit: 1000,
})
