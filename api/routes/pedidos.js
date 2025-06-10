const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Criar pedido
router.post('/', (req, res) => {
  const { data, complemento, telefone, cep, fk_usuario_id, livro_id, quantidade } = req.body;
  if (!data || !telefone || !cep || !fk_usuario_id || !livro_id || !quantidade) {
    return res.status(400).json({ error: 'Dados do pedido incompletos' });
  }
  const sqlPedido = 'INSERT INTO Pedido (data, complemento, telefone, cep, fk_usuario_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(sqlPedido, [data, complemento, telefone, cep, fk_usuario_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const pedidoId = result.insertId;
    const sqlPossui = 'INSERT INTO Possui (fk_livros_id, fk_pedido_id, quantidade) VALUES (?, ?, ?)';
    connection.query(sqlPossui, [livro_id, pedidoId, quantidade], (err2) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }
      res.status(201).json({ message: 'Pedido realizado com sucesso', pedidoId });
    });
  });
});

// Buscar todos os pedidos de um usuário específico
router.get('/:usuarioID', (req, res) => {
  const { usuarioID } = req.params;
  const sql = `SELECT pedido.id AS pedido_id, pedido.data, pedido.complemento, pedido.telefone, pedido.cep,
    possui.fk_livros_id AS livro_id, possui.quantidade,
    livros.nome AS livro_nome, livros.preco AS livro_preco, livros.descricao AS livro_descricao
    FROM pedido
    LEFT JOIN possui ON pedido.id = possui.fk_pedido_id
    LEFT JOIN livros ON possui.fk_livros_id = livros.id
    WHERE pedido.fk_usuario_id = ?
    ORDER BY pedido.data DESC`;
  connection.query(sql, [usuarioID], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;