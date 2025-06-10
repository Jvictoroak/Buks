const express = require('express');
const router = express.Router();
const connection = require('../db/connection');
const path = require('path');
const auth = require('../middleware/auth');

// Buscar produtos (rota pública)
router.get('/', (req, res) => {
  connection.query('SELECT * FROM livros', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Imagem do livro (rota pública)
router.get('/:id/imagem', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT imagem FROM Livros WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (!results[0].imagem) {
      return res.sendFile(path.resolve(__dirname, '../../buks/src/assets/img/livro_default.png'));
    }
    const img = Buffer.from(results[0].imagem, 'binary');
    if (img[0] === 0x89 && img[1] === 0x50) {
      res.setHeader('Content-Type', 'image/png');
    } else if (img[0] === 0xFF && img[1] === 0xD8) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else {
      res.setHeader('Content-Type', 'application/octet-stream');
    }
    res.end(img);
  });
});

// Proteger as demais rotas de livros
router.use(auth);

// Adicionar novo livro
router.post('/', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  let imagem = null;
  if (req.body.imagem) {
    imagem = Buffer.from(req.body.imagem, 'base64');
  }
  if (!nome || !preco || estoque === undefined) {
    return res.status(400).json({ error: 'Nome, preço e estoque são obrigatórios' });
  }
  const sql = 'INSERT INTO Livros (nome, descricao, preco, imagem, estoque) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nome, descricao, preco, imagem, estoque], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Livro adicionado com sucesso', id: result.insertId });
  });
});

// Atualizar livro
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, imagem, estoque } = req.body;
  const sql = 'UPDATE Livros SET nome = ?, descricao = ?, preco = ?, imagem = ?, estoque = ? WHERE id = ?';
  connection.query(sql, [nome, descricao, preco, imagem, estoque, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro atualizado com sucesso' });
  });
});

// Deletar livro
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Livros WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  });
});

module.exports = router;
