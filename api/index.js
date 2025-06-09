const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const token = req.headers.authorization?.split(' ')[1];
// const decoded = jwt.verify(token, 'secreto_buks');
// decoded agora tem os dados do usuário
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
      // Gera o token JWT com todos os dados do usuário
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          dataNascimento: usuario.dataNascimento
        },
        'secreto_buks', // Troque por uma chave secreta forte em produção
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login realizado com sucesso', usuario, token });
    } else {
      res.status(401).json({ error: 'Email ou senha inválidos' });
    }
  });
});


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
  })});

app.post('/pedidos', (req, res) => {
  console.log('Recebido no /pedidos:', req.body); // DEBUG
  const { data, complemento, telefone, cep, fk_usuario_id, livro_id, quantidade } = req.body;
  if (!data || !telefone || !cep || !fk_usuario_id || !livro_id || !quantidade) {
    return res.status(400).json({ error: 'Dados do pedido incompletos' });
  }
  // 1. Inserir na tabela Pedido
  const sqlPedido = 'INSERT INTO Pedido (data, complemento, telefone, cep, fk_usuario_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(sqlPedido, [data, complemento, telefone, cep, fk_usuario_id], (err, result) => {
    if (err) {
      console.error('Erro ao inserir Pedido:', err); // DEBUG
      return res.status(500).json({ error: err });
    }
    const pedidoId = result.insertId;
    // 2. Inserir na tabela Possui
    const sqlPossui = 'INSERT INTO Possui (fk_livros_id, fk_pedido_id, quantidade) VALUES (?, ?, ?)';
    connection.query(sqlPossui, [livro_id, pedidoId, quantidade], (err2) => {
      if (err2) {
        console.error('Erro ao inserir Possui:', err2); // DEBUG
        return res.status(500).json({ error: err2 });
      }
      res.status(201).json({ message: 'Pedido realizado com sucesso', pedidoId });
    });

  });
});

// Atualizar livro
app.put('/livros/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, imagem, estoque } = req.body;
  const sql = 'UPDATE Livros SET nome = ?, descricao = ?, preco = ?, imagem = ?, estoque = ? WHERE id = ?';
  connection.query(sql, [nome, descricao, preco, imagem, estoque, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro atualizado com sucesso' });
  });
});

// Deletar livro
app.delete('/livros/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Livros WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  });
});

// Endpoint para servir a imagem do livro
app.get('/livros/:id/imagem', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT imagem FROM Livros WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar imagem:', err);
      return res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    if (!results[0].imagem) {
      // Se não houver imagem, retorna a imagem padrão
      return res.sendFile(require('path').resolve(__dirname, '../buks/src/assets/img/livro_default.png'));
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

// Adicionar novo livro
app.post('/livros', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  let imagem = null;
  if (req.body.imagem) {
    // Se vier como base64, converte para buffer
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

app.listen(3001, () => console.log('API rodando na porta 3001'));