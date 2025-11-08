-- Clean slate: remove and recreate the testing database
DROP DATABASE IF EXISTS testing;
CREATE DATABASE testing CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Drop and recreate the user (safe for re-init)
DROP USER IF EXISTS '${MYSQL_USER}'@'%';
CREATE USER '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON testing.* TO '${MYSQL_USER}'@'%';
FLUSH PRIVILEGES;

USE testing;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, surname, email, password)
VALUES
('Alice', 'Wonderland', 'alice@example.com', 'alice123'),
('Bob', 'Burger', 'bob@example.com', 'bob123');

INSERT INTO products (name, description, price, stock)
VALUES
('Sneakers', 'Comfortable running shoes', 79.99, 20),
('Boots', 'Waterproof leather boots', 129.50, 10),
('Sandals', 'Light summer sandals', 39.00, 50);
