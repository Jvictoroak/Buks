const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Cadastrar usuário
router.post('/', (req, res) => {
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

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  const sql = 'SELECT * FROM Usuario WHERE email = ? AND senha = ?';
  connection.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      const usuario = results[0];
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          dataNascimento: usuario.dataNascimento
        },
        'secreto_buks',
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login realizado com sucesso', usuario, token });
    } else {
      res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  });
});

// Proteger rotas abaixo com JWT
router.use(auth);

// Atualizar usuário
router.post('/update/:id', (req, res) => {
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

// Deletar usuário
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Usuario WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  });
});

module.exports = router;
