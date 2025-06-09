const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const livrosRoutes = require('./routes/livros');
const usuariosRoutes = require('./routes/usuarios');
const pedidosRoutes = require('./routes/pedidos');

app.use('/livros', livrosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', pedidosRoutes);

app.listen(3001, () => console.log('API rodando na porta 3001'));