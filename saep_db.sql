CREATE DATABASE saep_db;
USE saep_db;

CREATE TABLE produto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20),
    quantidade INT,
    preco DECIMAL(10,2),
    estoque_minimo INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE especificacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT,
    tensao VARCHAR(20),
    dimensoes VARCHAR(50),
    resolucao_tela VARCHAR(50),
    capacidade_memoria VARCHAR(50),
    conectividade VARCHAR(50),
    descricao TEXT,
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE movimentacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT,
    tipo VARCHAR(10),
    quantidade INT,
    responsavel_id INT,
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

INSERT INTO produto (nome, tipo, quantidade, preco, estoque_minimo)
VALUES
('Notebook Lenovo', 'Eletronico', 15, 3500.00, 5),
('Monitor Dell 24"', 'Eletronico', 30, 899.90, 10),
('Smartphone Samsung A25', 'Eletronico', 20, 1599.99, 8);

INSERT INTO especificacao (produto_id, tensao, dimensoes, resolucao_tela, capacidade_memoria, conectividade, descricao)
VALUES
(1, 'Bivolt', '32x22x2cm', '1920x1080', '16GB RAM / 512GB SSD', 'Wi-Fi, Bluetooth', 'Notebook leve e rápido'),
(2, 'Bivolt', '24 polegadas', '1920x1080', 'N/A', 'HDMI, DisplayPort', 'Monitor com cores vibrantes'),
(3, '5V', '6.5 polegadas', '2400x1080', '2400x1080', '128GB', 'Wi-Fi, 4G, Bluetooth', 'Smartphone intermediário');

INSERT INTO movimentacao (produto_id, tipo, quantidade, responsavel_id)
VALUES
(1, 'entrada', 5, 101),
(2, 'saida', 2, 102),
(3, 'entrada', 10, 103);
