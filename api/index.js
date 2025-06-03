const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

// Endpoint para login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  const sql = 'SELECT * FROM Usuario WHERE email = ? AND senha = ?';
  connection.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      const usuario = results[0];
      // Gera o token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, nome: usuario.nome },
        'secreto_buks', // Troque por uma chave secreta forte em produção
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login realizado com sucesso', usuario, token });
    } else {
      res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  });
});

// Endpoint para atualizar usuário (UPDATE) usando POST
app.post('/usuarios/update/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, dataNascimento } = req.body;
  if (!nome || !email || !senha || !dataNascimento) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const sql = 'UPDATE Usuario SET nome = ?, email = ?, senha = ?, dataNascimento = ? WHERE id = ?';
  connection.query(sql, [nome, email, senha, dataNascimento, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  });
});

// Endpoint para deletar usuário (DELETE) usando POST
app.post('/usuarios/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Usuario WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  });
});

app.listen(3001, () => console.log('API rodando na porta 3001'));