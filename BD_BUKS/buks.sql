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
    imagem MEDIUMBLOB,
    estoque INT NOT NULL DEFAULT 0
);

-- Criação da tabela Pedido
CREATE TABLE Pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    complemento VARCHAR(100),
    telefone INT NOT NULL,
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

INSERT INTO Livros (nome, descricao, preco, estoque) VALUES
('O Senhor dos Anéis', 'Uma obra-prima de fantasia épica escrita por J.R.R. Tolkien.', 99.90, 10),
('1984', 'Um romance distópico de George Orwell.', 49.50, 25),
('Dom Quixote', 'Clássico da literatura espanhola escrito por Miguel de Cervantes.', 79.00, 15),
('A Revolução dos Bichos', 'Uma sátira política de George Orwell.', 35.90, 20),
('O Pequeno Príncipe', 'Uma obra filosófica e poética de Antoine de Saint-Exupéry.', 29.90, 30),
('Harry Potter e a Pedra Filosofal', 'O início da série de sucesso escrita por J.K. Rowling.', 59.90, 50),
('O Hobbit', 'Prelúdio de O Senhor dos Anéis, também escrito por Tolkien.', 69.90, 12),
('Crime e Castigo', 'Um clássico russo escrito por Fiódor Dostoiévski.', 54.80, 8),
('Orgulho e Preconceito', 'Romance clássico de Jane Austen.', 39.90, 18),
('A Metamorfose', 'Obra de Franz Kafka sobre a alienação humana.', 28.00, 22);
