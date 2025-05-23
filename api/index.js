const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

// Configuração do MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'postly',
  database: 'BUKS'
});

// Endpoint para buscar produtos
app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM livros', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
    console.log(results)
  });
});

app.listen(3001, () => console.log('API rodando na porta 3001'));