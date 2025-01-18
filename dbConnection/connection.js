const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: '', // provide your username
  password: '', // provide your password
  database: '' // provide your daabaseName
});

module.exports = db;
