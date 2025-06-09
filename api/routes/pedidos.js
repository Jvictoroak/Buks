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

module.exports = router;