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

app.use(express.json()); // Adicione isso para aceitar JSON no body

// Endpoint para cadastrar usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, dataNascimento } = req.body;
  if (!nome || !email || !senha || !dataNascimento) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }
  const sql = 'INSERT INTO Usuario (nome, email, senha, dataNascimento) VALUES (?, ?, ?, ?)';
  connection.query(sql, [nome, email, senha, dataNascimento], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', id: result.insertId });
  });
});

app.listen(3001, () => console.log('API rodando na porta 3001'));