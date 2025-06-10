-- Remove o banco de dados se já existir
DROP DATABASE IF EXISTS BUKS;

-- Cria o banco de dados com codificação UTF-8
CREATE DATABASE BUKS
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco de dados para uso
USE BUKS;

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataNascimento DATE
);

-- Criação da tabela Livros
CREATE TABLE Livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem LONGBLOB,
    estoque INT NOT NULL DEFAULT 0
);

-- Criação da tabela Pedido
CREATE TABLE Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_destinatario VARCHAR(50),
    data DATE NOT NULL,
    complemento VARCHAR(100),
    telefone VARCHAR(20) NOT NULL,
    cep CHAR(9) NOT NULL,
    fk_usuario_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela associativa Possui
CREATE TABLE Possui (
    fk_livros_id INT NOT NULL,
    fk_pedido_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    PRIMARY KEY (fk_livros_id, fk_pedido_id)
);

-- Adicionando chaves estrangeiras
ALTER TABLE Pedido ADD CONSTRAINT FK_pedido_usuario
    FOREIGN KEY (fk_usuario_id)
    REFERENCES Usuario (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE Possui ADD CONSTRAINT FK_possui_livros
    FOREIGN KEY (fk_livros_id)
    REFERENCES Livros (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE Possui ADD CONSTRAINT FK_possui_pedido
    FOREIGN KEY (fk_pedido_id)
    REFERENCES Pedido (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
    
