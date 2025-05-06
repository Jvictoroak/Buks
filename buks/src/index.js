const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8080;

//require('dotenv').config();

app.use(express.json());
app.use(cors());

//importante o modulo de mysql
var mysql = require('mysql2');

//criando a variável conn que vai ter a referência de conexão
//com o banco de dados
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "postly",
    database: "BUKS",
    port: "3000"
});

//tentando connectar
//a variável con tem a conexão agora
conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const generateToken = (id, email) => {
    return jwt.sign({ id: id, email: email }, 'meusegredoabc', {
        expiresIn: '1h'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, 'meusegredoabc');
};

// Corrigindo a consulta SQL no endpoint de login
app.post('/api/login', function (req, res) {
    let usuario = req.body;
    let sql = `SELECT u.id, u.senha FROM Usuario u WHERE u.email = '${usuario.email}'`;

    conn.query(sql, function (err, result) {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(401).send("Login inválido");

        usuario.id = result[0].id;
        usuario.senha = result[0].senha;

        // Validar senha
        if (usuario.senha !== req.body.senha) {
            return res.status(401).send("Senha inválida");
        }

        // Gerando o token
        const token = generateToken(usuario.id, usuario.email);
        res.json({ token: token });
    });
});

function authenticate(req, res, next) {
    //captura o token que vem no header
    const token = req.headers.authorization?.split(' ')[1];
    
    //valida se o token existe
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    try {
      //verica se o token foi gerado por este servidor
      //validando a palavra chave
      const decoded = verifyToken(token);
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  }

app.get('/api/usuario', authenticate, function (req, res) {
    //cria a string the consulta no baco do tipo select
    let sql = "SELECT u.id, u.nome FROM usuario u";
    //executando o comando sql com a função query
    //nela passamos a string de consulta
    //após a execução ele retorna o function que vai ter a variável err e result
    //se deu algum erro a variável err terá o erro obtivo
    //caso contrário o result terá dos dados do banco 
    conn.query(sql, function (err, result) {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
    });
});

// Corrigindo o endpoint para salvar um usuário
app.post('/api/usuario', function (req, res) {
    var usuario = req.body;
    var sql = '';

    if (usuario.id) {
        sql = `UPDATE Usuario SET 
            nome = '${usuario.nome}',
            idade = ${usuario.idade},
            email = '${usuario.email}',
            senha = '${usuario.senha}',
            dataNascimento = '${usuario.dataNascimento}'
        WHERE id = ${usuario.id}`;
    } else {
        sql = `INSERT INTO Usuario (nome, idade, email, senha, dataNascimento) VALUES 
        ('${usuario.nome}', ${usuario.idade}, '${usuario.email}', '${usuario.senha}', '${usuario.dataNascimento}')`;
    }

    conn.query(sql, function (err, result) {
        if (err) return res.status(500).json(err);
        res.status(201).json(usuario);
    });
});

// Corrigindo o endpoint para capturar um usuário por ID
app.get('/api/usuario/:id', (req, res) => {
    const { id } = req.params;

    let sql = `SELECT id, nome, idade, email, dataNascimento FROM Usuario WHERE id = ${id}`;
    conn.query(sql, function (err, result) {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.status(200).json(result[0]);
    });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});