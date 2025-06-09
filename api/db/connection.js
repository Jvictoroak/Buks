const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'postly',
  database: 'BUKS'
});
module.exports = connection;