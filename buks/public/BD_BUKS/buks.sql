-- Remove o banco de dados se já existir
DROP DATABASE IF EXISTS BUKS;

-- Cria o banco de dados
CREATE DATABASE BUKS;

-- Seleciona o banco de dados para uso
USE BUKS;

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    idade INT,
    email VARCHAR(50),
    senha VARCHAR(50),
    dataNascimento DATE
);

-- Criação da tabela livros
CREATE TABLE livros (
    id INT PRIMARY KEY,
    nome VARCHAR(50),
    descricao VARCHAR(200),
    preco DECIMAL(10,2),
    imagem LONGBLOB,
    estoque INT
);

-- Criação da tabela pedido
CREATE TABLE pedido (
    id INT PRIMARY KEY,
    data DATE,
    complemento VARCHAR(50),
    numero INT,
    cep VARCHAR(10),
    fk_Usuario_id INT
);

-- Criação da tabela associativa possui (sem chave primária, mas com UNIQUE)
CREATE TABLE possui (
    fk_livros_id INT NOT NULL,
    fk_pedido_id INT,
    UNIQUE (fk_livros_id, fk_pedido_id)
);

-- Adicionando chaves estrangeiras
ALTER TABLE pedido ADD CONSTRAINT FK_pedido_Usuario
    FOREIGN KEY (fk_Usuario_id)
    REFERENCES Usuario (id)
    ON DELETE RESTRICT;

ALTER TABLE possui ADD CONSTRAINT FK_possui_livros
    FOREIGN KEY (fk_livros_id)
    REFERENCES livros (id)
    ON DELETE RESTRICT;

ALTER TABLE possui ADD CONSTRAINT FK_possui_pedido
    FOREIGN KEY (fk_pedido_id)
    REFERENCES pedido (id)
    ON DELETE SET NULL;
